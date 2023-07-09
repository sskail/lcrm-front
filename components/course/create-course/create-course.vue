<template>
  <div
    class="modal fade"
    id="myModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    @keydown.esc="clearData"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Создать новый проект
          </h5>
          <button
            type="button"
            class="btn-close"
            data-dismiss="modal"
            aria-label="Close"
            @click="clearData"
          ></button>
        </div>
        <div class="modal-body form">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="courseName"
              v-model="courseName"
            />
            <label for="courseName" class="input-label">Название</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="deadline"
              :min="today"
              v-model="deadline"
            />
            <label for="deadline" class="input-label">Крайний срок</label>
          </div>

          <div
            class="form-floating mb-3"
          >
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="description"
            />
            <label for="description" class="input-label">Описание</label>
          </div>

          <span class="error" v-if="!fullInfo">Пожалуйста, введите полную информацию
</span>
          <span class="error" v-if="!success"
          >Пожалуйста, попробуйте другое название проекта</span
          >
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            id="close"
            data-dismiss="modal"
            @click="clearData"
          >
            Закрыть
          </button>
          <button type="button" class="btn create-btn" @click="createCourse">
            Создать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CreateCoursePopup",
  props: {
    instructorName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      courseName: "",
      description: "",
      fullInfo: true,
      deadline: null,
      success: true,
      today: ''
    };
  },
  mounted() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    // Pad month and day with leading zeroes if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    this.today = `${year}-${month}-${day}`;
  },
  methods: {
    createCourse() {
      this.success = true;
      if (this.courseName === "" || this.description === "") {
        this.fullInfo = false;
        return;
      }
      let data = {
        title: this.courseName,
        description: this.description,
      }
      if (this.deadline) {
        data.deadline = this.deadline
      }

      this.$axios
        .post(
          `/api/v1/teacher/project`,
          data
        )
        .then((response) => {
          this.$emit("createCourse", response.data);
          this.clearData();
          document.getElementById("close").click();
        })
        .catch((error) => {
          console.log(error);
          this.success = false;
        });
    },
    clearData() {
      this.courseName = "";
      this.description = "";
      this.fullInfo = true;
      this.success = true;
    },
  }
  ,
}
;
</script>

<style lang="scss" scoped>
.add-syllabus-item {
  width: 100%;
}

.create-btn {
  background-color: $main-color;
  color: $white;

  &:hover {
    background-color: $sub-color;
  }
}

.error {
  margin: 0 0 0 4px;
  color: red;
  font-size: 14px;
}
</style>
