<template>
  <div>

    <!--    <button type="button" class="btn btn-primary" @click="openModal">Выбрать пользователя</button>-->
    <div class="modal" ref="userModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Оценка проекта</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <b-form @submit.prevent="submitGrade">
            <div class="modal-body">
              <b-form-group label="Оценка" label-for="user-select">
                <b-form-input
                  type="number"
                  class="form-control"
                  id="grade"
                  v-model="grade"
                  max="5"
                  min="0"
                />
              </b-form-group>

              <b-form-group label="Комментарий" label-for="user-select">
                <b-form-textarea
                  class="form-control"
                  id="comment"
                  rows="3"
                  v-model="comment"
                ></b-form-textarea>
              </b-form-group>


            </div>

            <div class="modal-footer">
              <b-button type="submit" class="add-member-btn">Добавить</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      grade: null,
      comment: '',
      modalOpen: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    submitGrade() {
      // Отправка оценки и комментария на сервер или другие действия
      // Можно использовать Axios или другую библиотеку для HTTP-запросов
      console.log(`Оценка: ${this.grade}`);
      console.log(`Комментарий: ${this.comment}`);
      // Дополнительная логика обработки оценки
    },
    openModal() {
      this.$refs.userModal.classList.add('show');
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.$refs.userModal.classList.remove('show');
      document.body.classList.remove('modal-open');
    },
  },

};
</script>

<style lang="scss">

.add-member-btn {
  float: right;

  background-color: $main-color;
  color: $white;

  &:hover {
    background-color: $sub-color;
  }
}

.modal {
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.modal-dialog {
  max-width: 600px;
  margin: 1.75rem auto;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  background-color: #f7f7f7;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.list-group-item {
  cursor: pointer;
}

.btn-primary {
  margin: 1rem;
}
</style>

