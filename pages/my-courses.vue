<template>
  <div class="courses-container">
    <div class="courses-header row">
      <div class="col">
        <span class="courses-header__title">Мои проекты</span>
      </div>
    </div>
    <div>
      <course-card
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
      />
    </div>
  </div>
</template>

<script>

export default {
  middleware:'auth',
  components: {
    CourseCard: () => import("@/components/course/course-card/course-card.vue"),
  },
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    getMyCourses() {
      this.$axios.get(`/api/v1/teacher/project`)
        .then((response) => {
          // console.log(JSON.stringify(response.data.data))
          this.courses = response.data.data;
          console.log(this.courses)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    this.getMyCourses();
  },
};
</script>

<style lang="scss" scoped>
.courses-header {
  margin: 20px 0px;
  &__title {
    font-weight: 600;
    font-size: 24px;
  }

  .create-course-btn {
    float: right;
    padding: 10px 20px;
    background-color: $main-color;
    color: $white;

    &:hover {
      background-color: $sub-color;
    }
  }
}

.courses-container {
  margin: 80px auto;
  padding: 10px;
  border: solid 3px $white-smoke;
  max-height: 500px;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
