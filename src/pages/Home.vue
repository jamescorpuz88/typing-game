<script>
import Tabs from '@/components/Tabs.vue'
import TypingArea from '@/components/TypingArea.vue'
import { jsProblems } from '@/data/codingJsProblems'

export default {
  name: 'Home',
  components: {
    Tabs,
    TypingArea
  },
  data() {
    return {
      tabItems: ['typing.js', 'index.html', 'style.css'],
      typingText: jsProblems[Math.floor(Math.random() * jsProblems.length)]
    }
  },
  methods: {
    randomizeProblem() {
      const randomIndex = Math.floor(Math.random() * jsProblems.length)
      this.typingText = jsProblems[randomIndex]
    }
  },
  mounted() {
    this.randomizeProblem()
  }
}
</script>

<template @input="checkInput">
  <div class="type-field">
    <Tabs :tabs="tabItems" />
    <TypingArea :problem="typingText" @get-new-problem="randomizeProblem" />
  </div>
</template>

<style scoped></style>
