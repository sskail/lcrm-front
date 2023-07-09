<template>
  <form class="login">
    <!-- Email Field -->
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        id="username"
        placeholder="username"
        v-model="username"
      />
      <label for="username" class="auth__input-label">Имя пользователя</label>
    </div>

    <!-- Password Field -->
    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="password"
      />
      <label for="password" class="auth__input-label">Пароль</label>
    </div>

    <div class="alert alert-danger err-msg" role="alert" v-show="errorMessage">
      {{ this.errorMessage }}
    </div>

    <!-- Remember me -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="forgot-password col-md">
        <a href="/forgot" class="forgot-text"> Забыли пароль? </a>
      </div>
    </div>

    <!-- Login Btn -->
    <button
      type="submit"
      class="auth__submit-btn btn"
      :disabled="!username || !password"
      @click.prevent="login"
    >
      Войти
    </button>
  </form>
</template>

<script>

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      remember: false,
      errorMessage: "",
    };
  },
  computed: {
    payload() {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        // Redirect to a secure page
        window.location.href = "/"
      } catch (error) {
        // Handle login error
        console.error(error)
      }
    }
    // submit() {
    //   this.$axios
    //     .post(`/api/v1/login`, this.payload)
    //     .then(({ data }) => {
    //       setAccessToken(data.token);
    //       setUserData(data.userData);
    //
    //       window.location = "/";
    //     })
    //     .catch((error) => {
    //       // if error, set the error message to the received error message
    //       this.errorMessage = error.response.data.message;
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.forgot-password {
  text-align: end;
}

.forgot-text {
  color: $main-color;
  text-decoration: none;
}
</style>
