<script>
import Tabs from '@/components/Tabs.vue'
import TypingArea from '@/components/TypingArea.vue'
import Terminal from '@/components/Terminal.vue'
import TypingFooter from '@/components/TypingFooter.vue'
import { jsProblems } from '@/data/codingJsProblems'

export default {
  name: 'Home',
  components: {
    Tabs,
    TypingArea,
    Terminal,
    TypingFooter
  },
  data() {
    return {
      tabItems: ['typing.js', 'typing.java'],
      typingText: jsProblems[Math.floor(Math.random() * jsProblems.length)],
      gameState: false,
      gameStat: {
        gameState: false,
        startTime: 0,
        correct: 0,
        total: 0
      }
      // typingText: jsProblems[4]
    }
  },
  methods: {
    randomizeProblem() {
      const randomIndex = Math.floor(Math.random() * jsProblems.length)
      this.typingText = jsProblems[randomIndex]
      // this.typingText = jsProblems[4]
    },

    updateStatistic(statistic) {
      this.gameStat = {
        gameState: this.gameState,
        startTime: this.gameStat.startTime,
        ...statistic
      }
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
    <TypingArea
      :problem="typingText"
      @get-new-problem="randomizeProblem"
      @game-start="(time) => (gameStat.startTime = time)"
      @update-game-state="updateStatistic"
    />
    <Terminal :game-state="gameStat" />
    <TypingFooter :problem="typingText" />
  </div>
</template>

<style scoped></style>
