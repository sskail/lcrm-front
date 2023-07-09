<template>
  <div class="container auth">
    <div class="auth__wrapper">
      <form-header
        href="/signup"
        main-title="Войдите в свой аккаунт"
        second-title="Войдите в LCRM, чтобы учиться, спрашивать и делиться своими мыслями с другими."
      />

      <login-form />

      <or-divider />

      <div class="auth__footer">
        <span class="auth__footer-title">У вас нет аккаунта?</span>

        <a class="auth__link" href="/signup">Зарегистрироваться</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    LoginForm: () => import('@/components/auth/login-form/login-form.vue'),
    OrDivider: () => import('@/components/common/or-divider/or-divider.vue'),
    FormHeader: () => import('@/components/auth/form-header/form-header.vue'),
  },
  mounted() {
    if (this.$auth.loggedIn){
      window.location.href = '/'
    }
  }
};
</script>
