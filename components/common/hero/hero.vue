<template>
  <div class="wrapper">
    <div class="row align-items-center">
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div classname="hero-content">
          <h1 class="headline">Пересмотрите систему образования с помощью LCRM</h1>
          <div class="subheader">
            <p>
              Расширьте возможности своих студентов и преподавателей с помощью интегрированной платформы, объединяющей
              системы управления обучением и инструменты для совместной работы. Все в одном месте с помощью LCRM.
            </p>

            <div class="margin-top-md">
              <p>
                <span style="font-size: 16px">
                  Готовы ли вы изменить свои образовательные процессы?
                  <a href="/features" rel="noopener">
                    Узнать больше...
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="img-wrapper col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-0"
      >
        <img
          class="c-image"
          src="./../../../assets/hero.jpg"
          alt="LCRM hero image"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "hero",
};
</script>
<style lang="scss" scoped>
.img-wrapper {
  @media (max-width: 992px) {
    display: none;
  }
}

.c-image {
  max-width: 636px;
}

.wrapper {
  margin-bottom: 52px;
}
</style>
