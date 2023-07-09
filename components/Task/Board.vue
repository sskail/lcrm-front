<template>
  <div>
    <!--    <h3 class="board-heading"></h3>-->
    <!--    <draggable-->
    <!--      v-model="lists"-->
    <!--      v-bind="dragOptions"-->
    <!--      class="row flex-nowrap my-3">-->
    <div class="row flex-nowrap my-3"><!---->
      <TaskList
        v-for="(listItem, index) in lists"
        :key="index"
        :list="listItem"
        :remove-func="removeFunc"
        @changeList="changeList">
      </TaskList>
    </div>
    <!--    </draggable>-->
  </div>
</template>
<script>
export default {
  props: {
    board: {
      type: Object,
      default() {
        return {}
      }
    },
    removeFunc: Function
  },
  computed: {
    lists: {
      get() {
        return this.board.lists
      }
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        handle: ".heading",
        group: "task-board-lists"
      }
    }

  },
  methods: {
    changeList(data) {
      console.log('changeList')
      this.$emit('changeBoard', data)
    }
  }
}
</script>
