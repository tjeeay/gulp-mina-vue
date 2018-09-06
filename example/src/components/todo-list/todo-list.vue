<template>
  <todo-list-item
    wx:for="{{todos}}"
    wx:key="{{index}}"
    item="{{item}}"
  ></todo-list-item>
</template>

<script>
export default Component({
  config: {
    usingComponents: {
      'todo-list-item': '../todo-list-item/todo-list-item'
    }
  },

  properties: {
    todos: {
      type: Array,
      value: []
    }
  }
})
</script>
