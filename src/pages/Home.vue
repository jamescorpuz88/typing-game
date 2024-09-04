<script>
import Tabs from '@/components/Tabs.vue'
import TypingArea from '@/components/TypingArea.vue'
import Footer from '@/components/TypingFooter.vue'
import { jsProblems } from '@/data/codingJsProblems'

export default {
  name: 'Home',
  components: {
    Tabs,
    TypingArea,
    Footer
  },
  data() {
    return {
      tabItems: ['typing.js', 'typing.java'],
      typingText: jsProblems[Math.floor(Math.random() * jsProblems.length)]
      // typingText: jsProblems[4]
    }
  },
  methods: {
    randomizeProblem() {
      const randomIndex = Math.floor(Math.random() * jsProblems.length)
      this.typingText = jsProblems[randomIndex]
      // this.typingText = jsProblems[4]
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
    <Footer :problem="typingText" />
  </div>
</template>

<style scoped></style>
