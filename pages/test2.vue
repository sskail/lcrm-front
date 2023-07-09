<template>
  <div>
    <h2>Оценка проекта</h2>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Проект: {{ projectTitle }}</h5>
        <div class="form-group">
          <label for="grade">Оценка:</label>
          <input
            type="number"
            class="form-control"
            id="grade"
            v-model="grade"
          />
        </div>
        <div class="form-group">
          <label for="comment">Комментарий:</label>
          <textarea
            class="form-control"
            id="comment"
            rows="3"
            v-model="comment"
          ></textarea>
        </div>
        <button class="btn btn-primary" @click="submitGrade">Оценить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectTitle: '',
      grade: null,
      comment: ''
    };
  },
  methods: {
    submitGrade() {
      // Отправка оценки и комментария на сервер или другие действия
      // Можно использовать Axios или другую библиотеку для HTTP-запросов
      console.log(`Оценка: ${this.grade}`);
      console.log(`Комментарий: ${this.comment}`);
      // Дополнительная логика обработки оценки
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
