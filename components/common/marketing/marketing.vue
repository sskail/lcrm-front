
<template>
  <div class="container marketing">
      <!-- Three columns of text below the hero -->
      <div class="row">
          <div class="col-lg-4">
              <img
                      src="./../../../assets/values/1.jpg"
                      alt="Developer photo"
                      class="mb-4"
              />
              <h2>Совместная работа</h2>
              <div class="separator"></div>
              <p>
                  “Ваша команда может совместно работать над проектами, контролировать выполнение задач и следить за
                  прогрессом в режиме реального времени.”
              </p>
          </div>

          <div class="col-lg-4">
              <img
                      src="./../../../assets/values/2.jpg"
                      alt="Teacher photo"
                      class="mb-4"
              />

              <h2>Обучение и наставничество</h2>
              <div class="separator"></div>
              <p>
                  “Преподаватели могут отслеживать прогресс каждого студента, предоставлять обратную связь и помогать в
                  развитии необходимых навыков.”
              </p>
          </div>

          <div class="col-lg-4">
              <img
                      src="./../../../assets/values/3.jpg"
                      alt="Student photo"
                      class="mb-4"
              />

              <h2>Практический опыт</h2>
              <div class="separator"></div>
              <p>
                  "Студенты получают практический опыт работы с инструментами и методологиями, используемыми в
                  профессиональной среде.”
              </p>
          </div>
      </div>
      <hr class="featurette-divider"/>
      <!-- ... -->

      <div class="recent">
          <div class="recent__title">Последние проекты</div>
          <div class="recent__sub-title">
            Ваши проекты
          </div>

          <div class="row mt-lg-5">
              <recent-course
                      tag-color="#433ca9"
                      tag-bg-color="#e0e7ff"
                      :title="courses[0].name"
                      :instructor-name="courses[0].instructorName"
                      instructor-image="svgs/avatar.svg"
                      :course-date="courses[0].date"
              />
              <recent-course
                      tag-color="#a22155"
                      tag-bg-color="#fce7f3"
                      :title="courses[1].name"
                      :instructor-name="courses[1].instructorName"
                      instructor-image="svgs/avatar.svg"
                      :course-date="courses[1].date"
              />

          </div>
      </div>
  </div>
</template>


<!--        <div class="recent">-->
<!--            <div class="recent__title">Recent Courses</div>-->
<!--            <div class="recent__sub-title">-->
<!--                Check out our recent courses-->
<!--            </div>-->

<!--            <div class="row mt-lg-5">-->
<!--                <recent-course-->
<!--                    tag-color="#433ca9"-->
<!--                    tag-bg-color="#e0e7ff"-->
<!--                    :title="courses[0].name"-->
<!--                    :instructor-name="courses[0].instructorName"-->
<!--                    instructor-image="svgs/avatar.svg"-->
<!--                    :course-date="courses[0].date"-->
<!--                />-->
<!--                <recent-course-->
<!--                    tag-color="#a22155"-->
<!--                    tag-bg-color="#fce7f3"-->
<!--                    :title="courses[1].name"-->
<!--                    :instructor-name="courses[1].instructorName"-->
<!--                    instructor-image="svgs/avatar.svg"-->
<!--                    :course-date="courses[1].date"-->
<!--                />-->
<!--                <recent-course-->
<!--                    tag-color="#086047"-->
<!--                    tag-bg-color="#d1fae5"-->
<!--                    :title="courses[2].name"-->
<!--                    :instructor-name="courses[2].instructorName"-->
<!--                    instructor-image="svgs/avatar.svg"-->
<!--                    :course-date="courses[2].date"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

<!--        <hr class="featurette-divider" />-->

<!--        <div class="row featurette">-->
<!--            <div class="col-md-7">-->
<!--                <h2 class="featurette-heading">-->
<!--                    First featurette heading.-->
<!--                    <span class="text-muted">It’ll blow your mind.</span>-->
<!--                </h2>-->
<!--                <p class="lead">-->
<!--                    Some great placeholder content for the first featurette-->
<!--                    here. Imagine some exciting prose here.-->
<!--                </p>-->
<!--            </div>-->
<!--            <div class="col-md-5">-->
<!--                <img-->
<!--                    src="./../../../assets/demo/1.svg"-->
<!--                    alt="demo image"-->
<!--                    class="demo"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

<!--        <hr class="featurette-divider" />-->

<!--        <div class="row featurette">-->
<!--            <div class="col-md-7 order-md-2">-->
<!--                <h2 class="featurette-heading">-->
<!--                    Oh yeah, it’s that good.-->
<!--                    <span class="text-muted">See for yourself.</span>-->
<!--                </h2>-->
<!--                <p class="lead">-->
<!--                    Another featurette? Of course. More placeholder content here-->
<!--                    to give you an idea of how this layout would work with some-->
<!--                    actual real-world content in place.-->
<!--                </p>-->
<!--            </div>-->
<!--            <div class="col-md-5 order-md-1">-->
<!--                <img-->
<!--                    src="./../../../assets/demo/2.svg"-->
<!--                    alt="demo image"-->
<!--                    class="demo"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

<!--        <hr class="featurette-divider" />-->

<!--        <div class="row featurette">-->
<!--            <div class="col-md-7">-->
<!--                <h2 class="featurette-heading">-->
<!--                    And lastly, this one.-->
<!--                    <span class="text-muted">Checkmate.</span>-->
<!--                </h2>-->
<!--                <p class="lead">-->
<!--                    And yes, this is the last block of representative-->
<!--                    placeholder content. Again, not really intended to be-->
<!--                    actually read, simply here to give you a better view of what-->
<!--                    this would look like with some actual content. Your content.-->
<!--                </p>-->
<!--            </div>-->
<!--            <div class="col-md-5">-->
<!--                <img-->
<!--                    src="./../../../assets/demo/3.svg"-->
<!--                    alt="demo image"-->
<!--                    class="demo"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

<!--        <hr class="featurette-divider" />-->
<!--    </div>-->
<!--</template>-->

<script>

export default {
    name: "Marketing",
    data() {
        return {
            courses: [
                {
                    name: "Создание lcrm системы",
                    syllabus: "",
                    instructorName: "Teacher",
                    date: "",
                },
                {
                    name: "Test",
                    syllabus: "",
                    instructorName: "Teacher",
                    date: "",
                },
            ],
        };
    },
    components: {
        "recent-course": () => import("@/components/course/recent/recent.vue"),
    },
    methods: {
        getTopCourses() {
            this.$axios
                .get(`/api/v1/teacher/project`)
                .then(({ data }) => {
                    // this.courses = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.getTopCourses();
    },
};
</script>

<style lang="scss" scoped>
@import "./../hero/hero.scss";

.recent__title {
    font-size: 35px;
    font-weight: 700;
    margin-top: -30px;
}

.recent__sub-title {
    color: gray;
    margin-bottom: 24px;
}

.separator {
    background-color: $main-color;
    display: inline-block;
    height: 2px;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 69px;
}

.demo {
    width: 100%;
    height: 100%;
}
</style>
