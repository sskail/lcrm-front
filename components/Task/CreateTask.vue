<template>
  <div
    class="modal fade"
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
          <h5 class="modal-title" id="exampleModalLabel">Создать задачу</h5>
          <button
            type="button"
            class="btn-close"
            data-dismiss="modal"
            aria-label="Close"
            id="task-close"
            @click="clearData"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="title-input" class="form-label">Заголовок</label>
              <input type="text" class="form-control" id="title-input" v-model="form.title" required>
            </div>
            <div class="mb-3">
              <label for="name-input" class="form-label">Описание</label>
              <input type="text" class="form-control" id="name-input" v-model="form.name" required>
            </div>
            <div class="mb-3">
              <b-form-group label="Выберите пользователя" label-for="user-select">
                <b-form-select v-model="form.assignedUserID" :options="userOptions" id="user-select"
                               class="form-select"></b-form-select>
              </b-form-group>
            </div>


            <button type="submit" class="btn btn-danger">Создать задачу</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        name: "",
        status: "to-do",
        boardID: this.boardId,
        assignedUserID: null
      }
    };
  },
  methods: {
    async onSubmit() {

      try {
        const {message} = await this.$axios.post('/api/v1/project/board/task', this.form)

        console.log("ok")
        this.clearData();
        document.getElementById("task-close").click();
        this.refreshBoard()

      } catch (e) {
        console.log("onSubmit", e)
      }
    },
    refreshBoard() {
      this.$emit('refresh');
    },
    clearData() {
      this.title = "";
      this.name = "";
      this.success = true;
    },
  },
  props: {
    boardId: {type: Number, default: null},
    projectUsers: {type: Array, default: null, required: false}
  },
  computed: {
    userOptions() {
     return this.projectUsers.map(user => ({
        text: user.username,
        value: user.ID
      }));
    }
  }
};
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

