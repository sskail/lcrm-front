<template>
  <b-card :title=item.title @dblclick="clickHandler">
    <b-card-text class="text-center">
      {{ item.name }}
    </b-card-text>

    <b-card-footer>
      {{item.User.username}}
<!--      <b-button class="rate-btn btn-sm" >Оценить </b-button>-->

      <div class="rating">
      <span
        v-if="item.status ==='deploy'"
        v-for="star in stars"
        :key="star"
        :class="['star', { filled: star <= selectedRating }]"
        @click="selectRating(star)"
      >
        &#9733;
      </span>
      </div>
    </b-card-footer>
  </b-card>
</template>


<script>
export default {
  data() {
    return {
      selectedRating: 0,
      stars: [1, 2, 3, 4, 5]
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          text: undefined,
          ID: undefined,
          title: undefined,
          name: undefined,
        }
      }
    },
    removeFunc: Function
  },
  methods:{
    clickHandler(){
      this.removeFunc(this.item.ID)
    },
    selectRating(rating) {
      this.selectedRating = rating;
      this.sendRating()
    },
    sendRating() {


      // this.axios.post('/api/v1/ratings', { rating: this.selectedRating })
      //   .then(response => {
      //     console.log('Оценка успешно отправлена!');
      //   })
      //   .catch(error => {
      //     console.error('Ошибка при отправке оценки:', error);
      //   });
    }
  }
}
</script>


<style lang="scss" scoped>
.rate-btn {
  float: right;
  margin-top: -5px;

  background-color: $main-color;
  color: $white;

  &:hover {
    background-color: $sub-color;
  }
}


 .rating {
   color: #e2e2e2;
   float: right;

 }

.star {
  cursor: pointer;
}

.filled {
  color: #ffc107;
}

</style>
