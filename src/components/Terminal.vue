<template>
  <div class="terminal">
    <div class="terminal-tabs">
      <span> TERMINAL </span>
    </div>
    <div class="terminal-text">
      <p>
        <!-- PS C:\User\Documents\Repository\typing-game>{{ gameObject.gameState ? ' npm start' : '' }} -->
        PS C:\User\Documents\Repository\typing-game>
        {{ gameObject.gameState || gameObject.startTime !== 0 ? ' npm start' : '' }}
      </p>
      <div v-if="gameObject.startTime !== 0" style="margin-left: 16px">
        <p>{{ `WPM: ${gameStat.wpm}` }}</p>
        <p>{{ `Accuracy: ${gameStat.accuracy}%` }}</p>
        <p>{{ `AWPM: ${gameStat.awpm}` }}</p>
        <p>{{ `Time: ${gameStat.time}s` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Terminal',
  props: {
    gameState: { type: Object, required: true }
  },
  setup(props) {
    const gameObject = ref(props.gameState)
    const gameStat = ref({
      wpm: 0,
      awpm: 0,
      accuracy: 0,
      time: 0
    })

    return {
      gameObject,
      gameStat
    }
  },
  methods: {
    processData() {
      if (!this.gameObject.gameState) return

      const wpm = Math.round(
        this.gameObject.correct / 5 / ((Date.now() - this.gameObject.startTime) / 60000)
      )
      const accuracy = Math.round((this.gameObject.correct / this.gameObject.total) * 100)
      const awpm = wpm * (accuracy / 100)
      const time = (Date.now() - this.gameObject.startTime) / 1000

      this.gameStat = {
        wpm,
        awpm,
        accuracy,
        time
      }
    }
  },
  watch: {
    gameState(newVal) {
      this.gameObject = newVal

      this.processData()
    }
  }
}
</script>

<style scoped>
.terminal {
  background-color: rgb(20, 20, 20);

  border-top: 1px solid rgb(48, 48, 48);
  border-bottom: 1px solid rgb(48, 48, 48);

  min-height: 180px;
}

.terminal-tabs {
  margin-left: 8px;
}

.terminal-text {
  padding: 8px;

  font-size: 0.9rem;
  font-family: 'Courier New', Courier, monospace;
}

span {
  font-size: 0.75rem;
  border-bottom: 1px solid #3479d1;

  cursor: pointer;
}
</style>
