<template>
  <div class="terminal">
    <div class="terminal-tabs">
      <span> TERMINAL </span>
    </div>
    <div class="terminal-text">
      <p>
        PS C:\User\Documents\Repository\typing-game>
        {{ gameStat.isStarted || gameStat.startTime !== 0 ? ' npm start' : '' }}
      </p>
      <div v-if="gameStat.startTime !== 0" style="margin-left: 16px">
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
    propData: { type: Object, required: true }
  },
  setup(props) {
    const gameStat = ref(props.propData)

    return {
      gameStat
    }
  },
  methods: {
    updateGameStat(gameStat) {
      this.gameStat = gameStat
    }
  },
  watch: {
    propData(newVal) {
      this.updateGameStat(newVal)
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
