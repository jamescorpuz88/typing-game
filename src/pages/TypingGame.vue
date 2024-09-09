<template @input="checkInput">
  <div class="type-field">
    <Tabs :tabs="tabs.map(tab => tab.tabName)" :selected-tab="selectedTab" @select-new-tab="onSelectNewTab"/>
    <TypingArea
      :problem="typingText"
      :popup-visible="isPopupVisible"
      @game-start="(time) => (startTime = time)"
      @game-finish="gameFinish"
      @update-game-data="updateData"

      ref="typingArea"
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
import {tabItems} from '@/data/tabItems'

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
      selectedTab: 0,
      tabs: tabItems,
      typingText: tabItems[0].typingProblems[0],

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
      var typingProblems = tabItems[this.selectedTab].typingProblems
      const randomIndex = Math.floor(Math.random() * typingProblems.length)
      this.typingText = tabItems[this.selectedTab].typingProblems[randomIndex]
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

    gameRestart() {
      this.$refs.typingArea.resetGame()
      this.gameStat.isStarted = false
      this.gameStat.startTime = 0

      this.randomizeProblem()
    },

    openPopup() {
      this.isPopupVisible = true
    },

    closePopup() {
      this.isPopupVisible = false
    },

    onSelectNewTab(index) {
      this.selectedTab = index
      this.gameRestart()
    }
  },
  mounted() {
    this.randomizeProblem()
  }
}
</script>

<style scoped></style>
