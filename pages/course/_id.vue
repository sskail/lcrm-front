<template>
  <div class="course">
    <div class="jumbotron jumbotron-fluid">
      <div class="course__header">
        <div class="header__titles">

          <p>
            <button
              @click="openUserModal"
              type="button"
              class="btn add-member-btn">
              Добавить ученика
            </button>
            <button
              @click="openGradeModal"
              type="button"
              class="btn add-member-btn mx-3"
              :disabled="!projectComplete">
              Оценить проект
            </button>
          </p>
          <h1 class="dummy-title">
            Название проекта:
          </h1>
          <p>{{ courseInfo.title }}</p>


        </div>

        <b-row>
          <b-col sm="4">
            <h3>Участники проекта:</h3>
            <ul class="list-group">
              <li
                v-for="user in courseInfo.Users"
                :key="user.ID"
                class="list-group-item"
                @click="deleteUser(user)"
              >
                {{ user.username }}
                <span style="float: right">
                 <b> Оценка: 5</b>
                </span>
              </li>
            </ul>
          </b-col>

        </b-row>

      </div>
    </div>

    <div class="course__instructor">
      <div class="row">
        <div class="col left-col">
          <div class="dummy-title">Преподаватель:</div>
        </div>
        <div class="col instructor">
          <img
            :src="`https://avatars.dicebear.com/api/initials/${courseInfo.Creator.username}.svg?background=%234f46e5`"
            alt="the instructor image"
            class="instructor__image"
          />
          <div class="instructor__info">
            <div class="instructor__name">
              {{ courseInfo.Creator.username }}
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="p-3 mt-4 mb-3">
            <h5>Оценка проекта: <b>5</b></h5>

          </div>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'trello' }"
          @click="setActiveTab('trello')"
        >Задачи</a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'qa' }"
          @click="setActiveTab('qa')"
        >Q & A</a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'git' }"
          @click="setActiveTab('git')"
        >Git</a>
      </li>
    </ul>

    <div class="mt-4">
      <Trello
        v-if="activeTab === 'trello'"
        :projectUsers="courseInfo.Users"
        @projectComplete="setProjectComplete"
      />

      <QA v-else-if="activeTab === 'qa'" :courseID="courseID"/>

      <div v-else-if="activeTab === 'git'">
        <Git/>
      </div>
    </div>
    <hr class="featurette-divider"/>

    <UserModal ref="userModal" :project_id="courseID"></UserModal>
    <GradeModal ref="GradeModal"></GradeModal>


  </div>

</template>

<script>


export default {

  async asyncData({$axios, params}) {
    const {data} = await $axios.get(`/api/v1/teacher/project/${params.id}`)
    return {
      courseInfo: data.data,
      courseID: +params.id
    };

  },

  name: "Course",
  data() {
    return {
      activeTab: 'trello',
      instructorName: "",
      instructorTitle: "",
      userImage: "",
      projectComplete:false
    };
  },
  methods: {
    setProjectComplete(val){
      this.projectComplete = val
    },

    openUserModal() {
      this.$refs.userModal.openModal();
    },
    openGradeModal() {
      this.$refs.GradeModal.openModal();
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    getCourseInfo() {
      console.log(123123)

    },
  },
  components: {
    UserModal: () => import('@/components/course/UserModal.vue'),
    GradeModal: () => import('@/components/course/GradeModal.vue'),
    QA: () => import("@/components/course/qa/qa.vue"),
    Trello: () => import("@/components/Task/Trello.vue"),
    Git: () => import("@/components/git/index.vue"),
    Activities: () =>
      import("@/components/course/activities/activities.vue"),
  },
  mounted() {
    this.getCourseInfo();
  },
};
</script>

<style lang="scss">
.header__titles {
  font-size: 3.75rem;
  line-height: 1;
  color: rgba(17, 24, 39, 1);
  letter-spacing: 0.025em;
  font-weight: 800;
  //font-family: fantasy;
}

.header__main-title {
  margin-bottom: 0;
}

.header__sub-title {
  color: $main-color;
}

.jumbotron {
  margin-bottom: $spacing-9x;
}

.instructor {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 8px 24px;
}

.dummy-title {
  font-size: 32px;
  font-weight: 600;
}

.instructor__name {
  font-size: 24px;
  font-weight: 600;
}

.instructor__title {
  font-weight: 600;
  color: $main-color;
}

.left-col {
  display: flex;
  align-items: center;
}

.left-col,
.right-col {
  margin-bottom: 20px;
}

.instructor__image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 100%;
}

.nav-item {
  &:hover {
    cursor: pointer;
  }
}

.sub-dummy-title {
  color: $dark-gray;
}

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

.add-member-btn, .add-task-btn {
  float: right;
  padding: 10px 20px;
  background-color: $main-color;
  color: $white;

  &:hover {
    background-color: $sub-color;
  }
}
</style>
