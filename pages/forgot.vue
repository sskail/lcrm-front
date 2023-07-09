<template>
  <div class="container auth">
    <div class="auth__wrapper">
      <form-header
        href="/login"
        main-title="Забыли пароль?"
        second-title="Не волнуйтесь! Просто введите свой e-mail, и мы вышлем вам ссылку для сброса пароля."
      />

      <forgot-form />

      <or-divider />

      <div class="auth__footer">
        <span class="auth__footer-title">Вернуться к логину ?</span>

        <a class="auth__link" href="/login">Вход в систему</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgot',
  components: {
    ForgotForm: () => import('@/components/auth/forgot-form/forgot-form.vue'),
    OrDivider: () => import('@/components/common/or-divider/or-divider.vue'),
    FormHeader: () => import('@/components/auth/form-header/form-header.vue'),
  },
};
</script>
