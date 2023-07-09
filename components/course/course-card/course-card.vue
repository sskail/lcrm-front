<template>
  <div class="course">
    <b-row>
      <b-col sm="9" class="col-9" >
        <div class="course__header">
          <div class="course__info">
            <div class="course__title">{{ course.title }}</div>
            <div class="course__date">Создано в {{ course.CreatedAt }}</div>
          </div>
          <div class="course__instructor instructor__name">
            {{ course.Creator.username }}
          </div>
        </div>
        <div class="course__action d-flex justify-content-between align-items-center">
          <div>
            <button
              class="btn btn-outline-secondary course__btn"
              @click.prevent="enroll()"
              v-if="$auth.user.role !== 2 && course.CreatorId !== $auth.user.ID"
            >
              Записаться
            </button>
            <router-link :to="`/course/${course.ID}`">
              <button
                class="btn btn-outline-secondary course__btn"
                v-if="$auth.user.role !== 2 || course.CreatorId === $auth.user.ID"
              >
                Посмотреть
              </button>
            </router-link>
          </div>
        </div>
      </b-col>
      <b-col sm="3" class="col-3 text-right">
        <span>Проект не оценен преподавателем</span>
      </b-col>
    </b-row>
  </div>
</template>


<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.setUserInfo();
  },
  methods: {

    enroll() {
      this.$axios
        .post(
          `/users/enrollMe`,
          {
            courseId: this.course.ID,
          },
        )
        .then((response) => {
          console.log(response);
          this.$emit("updateCourse", this.course.ID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.course {
  padding: 24px;
  border-radius: 10px;
  border: 1px solid rgba(108, 122, 137, 0.25);
  //display: flex;
  margin-bottom: 16px;

  &__img {
    margin-right: 16px;

    @media (max-width: 768px) {
      display: none;
    }

    & > img {
      max-height: 180px;
      max-width: 180px;
    }
  }

  &__title {
    font-size: 24px;
  }

  &__date {
    font-size: 12px;
    color: gray;
  }

  &__info {
    margin-bottom: 8px;
  }

  &__description {
    color: darkslategray;
    margin-bottom: 8px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  &__data {
    display: flex;
    flex-direction: column;
  }

  &__btn {
    color: $main-color;
    border-color: $main-color;
    width: -webkit-fill-available;

    &:hover {
      background-color: $sub-color;
      color: $white;
    }
  }
}

.card-header {
  text-align: center;
}

.instructor__name {
  font-weight: 600;
  color: $main-color;
  margin-bottom: 12px;
}
</style>
