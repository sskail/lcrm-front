<template>
  <div>

    <!--    <button type="button" class="btn btn-primary" @click="openModal">Выбрать пользователя</button>-->
    <div class="modal" ref="userModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Выберите пользователя</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <b-form @submit.prevent="submitForm">
            <div class="modal-body">
              <b-form-group label="Выберите пользователя" label-for="user-select">
                <b-form-select v-model="selectedUser" :options="userOptions" id="user-select"
                               class="form-select"></b-form-select>
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
      users: [],
      selectedUser: null,
      modalOpen: false,
      userOptions: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$axios.get('/api/v1/project/board/users') // Замените '/api/v1/users' на ваш эндпоинт для получения данных с сервера
        .then(response => {
          this.users = response.data.data.filter(user => user.roleId === 3);
          this.userOptions = this.users.map(user => ({
            text: user.username,
            value: user.ID
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    openModal() {
      this.$refs.userModal.classList.add('show');
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.$refs.userModal.classList.remove('show');
      document.body.classList.remove('modal-open');
    },

    submitForm() {
      // Выполните действия по добавлению пользователя, используя выбранного пользователя (this.selectedUser)
      // Например, можно отправить запрос на сервер с новыми данными пользователя
      this.$axios.post('/api/v1/teacher/project/member', {
        "project_id": this.project_id.toString(),
        "user_id":this.selectedUser.toString()
      })
        .then(response => {
          this.$nuxt.refresh();

          this.modalOpen = false;
          this.closeModal()

        })
        .catch(error => {
          // Обработка ошибки
        });
      // Закрытие модального окна после успешного добавления пользователя
    }
  },
  props: {
    project_id: {type: Number, default: null, required: true}
  }
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

