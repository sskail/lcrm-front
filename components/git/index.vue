<template>
  <div>
    <h2>Содержимое репозитория:</h2>
    <ul class="list-group">
      <li v-for="file in files" :key="file.name" class="list-group-item">
        <p class="mb-1"><strong>{{ file.name }}</strong></p>
        <p>{{ file.content }}</p>
      </li>
    </ul>

    <h2>История коммитов:</h2>
    <ul class="list-group">
      <li v-for="commit in commits" :key="commit.sha" class="list-group-item">
        <p class="mb-1"><strong>{{ commit.message }}</strong></p>
        <p class="mb-1">SHA: {{ commit.sha }}</p>
        <p class="mb-0">Автор: {{ commit.author }}</p>
        <p class="mb-0">Дата: {{ formatDate(commit.date) }}</p>
      </li>
    </ul>

    <div v-if="isLoading" class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      commits: [],
      isLoading: true, // Добавлено свойство isLoading
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatDate(datetimeString) {
      // console.log(datetimeString)
      // const datetime = new Date(datetimeString);
      // console.log(datetime)
      //

      const formattedDatetimeString = datetimeString.replace(" UTC", ""); // Удаление " UTC" из строки

      const dateParts = formattedDatetimeString.split(" ");
      const date = dateParts[0];
      const time = dateParts[1];

      const [year, month, day] = date.split("-");
      const [hours, minutes, seconds] = time.split(":");

      const datetime = new Date(year, month - 1, day, hours, minutes, seconds);
      const formattedDatetime = datetime.toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      });
      console.log(formattedDatetime)

      return formattedDatetime.replace(",", " в");
    },
    fetchData() {
      this.$axios
        .get('/api/v1/git/test')
        .then((response) => {
          this.files = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });

      this.$axios
        .get('/api/v1/git/history')
        .then((response) => {
          this.commits = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false; // Устанавливаем isLoading в false после получения данных
        });
    },
  },
};
</script>
