<template>
  <div>
    <div class="popup" v-if="isVisible">
      <div class="backdrop" @click="$emit('closePopup')"></div>
      <div class="content container">
        <div class="stats">
          <h2>{{ `WPM` }}</h2>
          <h1>{{ `${gameData.wpm}` }}</h1>
          <div class="stat-row">
            <div>
              <h2>{{ `Accuracy` }}</h2>
              <h1>{{ `${gameData.accuracy}` }}</h1>
            </div>
            <div>
              <h2>{{ `AWPM` }}</h2>
              <h1>{{ `${gameData.awpm}` }}</h1>
            </div>
            <div>
              <h2>{{ `Time` }}</h2>
              <h1>{{ `${gameData.time}s` }}</h1>
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
}

.stats {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.stat-row {
  background-color: aqua;

  display: flex;
  flex: 1;
  justify-content: space-between;
}

h1 {
  margin: 0;
  font-size: 48px;
}
</style>
