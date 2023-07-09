<template>
  <div class="col-3 list-column list-width">
    <div class="heading">
      <h4 class="heading-text text-center">
        {{ list.name }}
      </h4>
    </div>
    <draggable
      v-model="items"
      v-bind="dragOptions">
      <TaskListItem
        v-for="(item,index) in items"
        :key="index"
        class="task-item"
        :item="item"
        :remove-func="removeFunc">
      </TaskListItem>
    </draggable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    },
    removeFunc: Function
  },
  computed: {
    items: {
      get() {
        return this.list.items
      },
      set(value) {
        this.$emit('changeList', {
          items: value,
          listId: this.list.id,
          position: this.list.position
        })
      }
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "task-list-items"
      }
    }
  }

}
</script>
