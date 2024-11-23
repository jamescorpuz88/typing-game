<template>
  <div class="footer container">{{ problemLength }} characters</div>
</template>

<script>
export default {
  name: 'TypingFooter',
  props: {
    problem: { type: Object, required: true }
  },
  data() {
    let problemLength = this.problem.problem.split('\n').join('').length
    
    return {
      problemLength
    }
  },
  watch: {
    problem(newProblem) {
      this.problemLength = newProblem.problem.split('\n').join('').length
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
