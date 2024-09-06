<template @input="checkInput">
  <div class="type-field">
    <Tabs :tabs="tabItems" />
    <TypingArea
      :problem="typingText"
      :popup-visible="isPopupVisible"
      @game-start="(time) => (startTime = time)"
      @game-finish="gameFinish"
      @update-game-data="updateData"
    />
    <Terminal :prop-data="gameStat" />
    <TypingFooter :problem="typingText" />
    <GameStatPopup :is-visible="isPopupVisible" :game-data="gameStat" @closePopup="closePopup" />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import TypingArea from '@/components/TypingArea.vue'
import Terminal from '@/components/Terminal.vue'
import TypingFooter from '@/components/TypingFooter.vue'
import GameStatPopup from '@/components/GameStatPopup.vue'
import { jsProblems } from '@/data/codingJsProblems'

export default {
  name: 'TypingGame',
  components: {
    Tabs,
    TypingArea,
    Terminal,
    TypingFooter,
    GameStatPopup
  },
  data() {
    return {
      tabItems: ['typing.js', 'typing.java'],
      typingText: jsProblems[Math.floor(Math.random() * jsProblems.length)],
      // typingText: jsProblems[4]

      // Game Data
      isStarted: false,
      startTime: 0,
      gameStat: {
        isStarted: false,
        startTime: 0,
        wpm: 0,
        awpm: 0,
        accuracy: 0,
        time: 0
      },

      // Popup
      isPopupVisible: false
    }
  },
  methods: {
    randomizeProblem() {
      const randomIndex = Math.floor(Math.random() * jsProblems.length)
      this.typingText = jsProblems[randomIndex]
      // this.typingText = jsProblems[4]
    },

    updateData(data) {
      const gameData = {
        gameState: this.isStarted,
        startTime: this.startTime,
        ...data
      }

      this.processGameData(gameData)
    },

    processGameData(gameData) {
      if (!gameData.gameState) {
        return
      }

      const wpm = Math.round(gameData.correct / 5 / ((Date.now() - gameData.startTime) / 60000))
      const accuracy = Math.round((gameData.correct / gameData.total) * 100)
      const awpm = wpm * (accuracy / 100)
      const time = (Date.now() - gameData.startTime) / 1000

      const gameStat = {
        isStarted: gameData.gameState,
        startTime: gameData.startTime,
        wpm,
        awpm,
        accuracy,
        time
      }

      this.gameStat = gameStat
    },

    gameFinish() {
      this.openPopup()
      this.randomizeProblem()
    },

    openPopup() {
      this.isPopupVisible = true
    },

    closePopup() {
      this.isPopupVisible = false
    }
  },
  mounted() {
    this.randomizeProblem()
  }
}
</script>

<style scoped></style>
