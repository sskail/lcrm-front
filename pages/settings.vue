<template>
  <div class="container-settings">
    <div class="header">
      <h2 class="header__title">Редактировать учетную запись</h2>
    </div>
    <form class="form">
      <!-- Username Field -->
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          v-model="username"
        />
        <label for="username" class="input-label">Username</label>
      </div>

      <!-- Email Field -->
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="username@gmail.com"
          v-model="email"
        />
        <label for="email" class="input-label">Email</label>
      </div>

      <!-- Name Fields -->
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="first-name"
              placeholder="First Name"
              v-model="firstName"
            />
            <label for="first-name" class="input-label">First Name</label>
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="last-name"
              placeholder="Last Name"
              v-model="lastName"
            />
            <label for="last-name" class="input-label">Last Name</label>
          </div>
        </div>
      </div>

      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="git-api"
          placeholder="Github token"
          v-model="gitApi"
        />
        <label for="password" class="auth__input-label">Github token</label>
      </div>

      <!-- Update Btn -->
      <button
        type="submit"
        class="btn btn-block update-btn"
        :disabled="!isChanged"
        @click.prevent="update"
      >
        Обновить
      </button>
    </form>

    <hr class="featurette-divider"/>
  </div>
</template>

<script>

export default {
  middleware:'auth',
  computed: {
    isChanged: function () {
      if (this.userData.email !== this.email) return true;
      if (this.userData.username !== this.username) return true;
      if (this.userData.lastName !== this.lastName) return true;
      if (this.userData.firstName !== this.firstName) return true;
      if (this.userData.gitApi !== this.gitApi) return true;
      return false;
    },
    payload() {
      return {
        email: this.email,
        username: this.username,
        lastName: this.lastName,
        firstName: this.firstName,
        gitApi: this.gitApi
      };
    },
  },
  created: function () {
    this.getUserData();
  },
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      gitApi: "",
      userData: {},
    };
  },
  methods: {
    update() {
      console.log(this.payload)
      this.$axios
        .put(`/api/v1/auth/user/${this.$auth.user.ID}`, this.payload)
        .then((response) => {
          console.log(response);
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserData() {
      this.userData = {
        username: this.$auth.user.username,
        firstName: this.$auth.user.firstName,
        lastName: this.$auth.user.lastName,
        email: this.$auth.user.email,
        gitApi: this.$auth.user.gitApi,
        userData: {},
      }
      this.updateModels()
    },
    updateModels() {
      this.username = this.userData.username;
      this.email = this.userData.email;
      this.firstName = this.userData.firstName;
      this.lastName = this.userData.lastName;
      this.gitApi = this.userData.gitApi;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-settings {
  text-align: center;

  .header {
    &__title {
      font-weight: bold;
    }
  }

  .form {
    max-width: 70%;
    margin: 20px auto;

    .update-btn {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 10px;
      width: 50%;
      background-color: $main-color;
      color: $white;

      &:hover {
        background-color: $sub-color;
      }
    }
  }
}
</style>
