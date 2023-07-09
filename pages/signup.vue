<template>
  <div class="container auth">
    <div class="auth__wrapper">
      <form-header
        href="/login"
        main-title="Создайте новую учетную запись"
        second-title="Создайте новую учетную запись, чтобы учиться, спрашивать и делиться своими мыслями с другими."
      />

      <signup-form />

      <or-divider />

      <div class="auth__footer">
        <span class="auth__footer-title">У вас есть аккаунт?</span>

        <a class="auth__link" href="/login">Вход в систему</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  components: {
    FormHeader: () => import('@/components/auth/form-header/form-header.vue'),
    OrDivider: () => import('@/components/common/or-divider/or-divider.vue'),
    SignupForm: () => import('@/components/auth/singup-form/signup-form.vue'),
  },
  mounted() {
    if (this.$auth.loggedIn){
      window.location.href = '/'
    }
  }
};
</script>
