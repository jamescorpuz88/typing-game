<template>
  <div class="footer container">{{ problemLength }} characters</div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    problem: { type: Object, required: true }
  },
  data() {
    const problemLength = this.problem.problem.split('\n').join('').length
    return {
      problemLength
    }
  }
}
</script>

<style scoped>
.footer {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-left: 16px;
}
</style>
