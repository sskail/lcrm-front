<template>
  <div class="progress">
    <div class="progress-bar" :class="progressClass" role="progressbar" :aria-valuenow="completionPercentage" aria-valuemin="0" aria-valuemax="100" :style="{ width: completionPercentage + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    completionPercentage: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressClass() {
      if (this.completionPercentage <= 25) {
        return 'bg-danger';
      } else if (this.completionPercentage <= 50) {
        return 'bg-warning';
      } else if (this.completionPercentage <= 75) {
        return 'bg-info';
      } else {
        return 'bg-success';
      }
    }
  }
};
</script>

<style scoped>
.progress {
  height: 20px;
}

.progress-bar {
  transition: width 0.3s;
}
</style>
