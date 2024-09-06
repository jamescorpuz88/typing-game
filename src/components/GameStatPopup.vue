<template>
  <div>
    <div class="popup" v-if="isVisible">
      <div class="backdrop" @click="$emit('closePopup')"></div>
      <div class="content container">
        <div class="stats">
          <div class="wpm">
            <h1>{{ gameData.wpm }}</h1>
            <h2>WPM</h2>
          </div>
          <div class="stat-row">
            <div class="stat">
              <h1>{{ gameData.awpm }}</h1>
              <h2>AWPM</h2>
            </div>
            <div class="stat">
              <h1>{{ gameData.accuracy }}</h1>
              <h2>Accuracy</h2>
            </div>
            <div class="stat">
              <h1>{{ gameData.time.toFixed(2) }}</h1>
              <h2>s</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameStatPopup',
  props: {
    isVisible: { type: Boolean, required: true },
    gameData: { type: Object, required: true }
  },
  setup(props) {
    console.log(props.isVisible)
  },
  data() {
    return {
      gameStat: {}
    }
  },
  watch: {
    gameData(newVal) {
      this.gameStat = newVal
    }
  }
}
</script>

<style>
.popup {
  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;
}

.backdrop {
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  width: 600px;
  height: 400px;

  display: flex;
  align-items: center;

  padding: 32px;
  border-radius: 8px;
}

.stats {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.stat-row {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-top: 8px;

  gap: 8px;
}

.stat {
  display: flex;
  flex-direction: row;
  flex: 1;

  justify-content: center;
  align-items: center;

  border: 2px solid #444444;
  padding: 8px;
  border-radius: 8px;

  h2 {
    margin-top: auto;
    margin-bottom: 8px;
  }
}

h1 {
  margin: 0;
  font-size: 48px;
}

.wpm {
  display: flex;
  flex-direction: row;
  flex: 1;

  border: 2px solid #444444;
  border-radius: 8px;
  padding: 8px;

  justify-content: center;

  h2 {
    margin-top: auto;
    margin-bottom: 8px;
  }
}
</style>
