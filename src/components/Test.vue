<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$refs['play-field'].focus()
    window.addEventListener('keyup', this.checkInput.bind(this))
  },
  data() {
    const currentRowPosition = 0
    var reference_text = this.text.split('\n')

    return {
      INPUT_CHARACTERS:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;\':",./<>? ',
      current_typings: '',
      processed_typings: Array(reference_text.length).fill(''),
      reference_text,
      currentRowPosition
    }
  },
  methods: {
    checkInput(e) {
      // if (this.INPUT_CHARACTERS.includes(e.key)) {
      //   this.processed_typings[this.currentRowPosition] += e.key
      //   this.$refs['play-field'].focus()
      // }

      console.log(this.processed_typings);
    },

    getCharacterClass(row, column) {
      if (this.reference_text[row][column] === this.current_typings[column]) {
        return 'correct'
      } else {
        return 'incorrect'
      }
      // if (column < this.current_typings.length) {
      //   if (this.reference_text[row][column] === this.current_typings[column]) {
      //     return 'correct'
      //   } else {
      //     return 'incorrect'
      //   }
      // }
      // if (column < this.current_typings.length) {
      //   if (this.reference_text[row][column] === this.current_typings[column]) {
      //     return 'correct'
      //   } else {
      //     return 'incorrect'
      //   }
      // }
    },

    setCurrentRowPosition() {
      const textArea = this.$refs['play-field']
      const textUpToCursor = textArea.value.slice(0, textArea.selectionStart)

      this.currentRowPosition = (textUpToCursor.match(/\n/g) || []).length + 1
    }
  }
}
</script>

<template>
  <div class="typing-area container-muted">
    <div class="pseudo-text-area">
      <div v-for="(line, row) in reference_text">
        <!-- <span v-for="(char, column) in line.replace('\t', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')" :key="column" :class="getCharacterClass(row, column)"> -->
        <span v-for="(char, column) in line" :key="column" :class="getCharacterClass(row, column)">
            <div> test </div>
            <div> test </div>
          <!-- {{ char}} -->
        </span>
      </div>
      <textarea
        class="hidden"
        v-model="current_typings"
        ref="play-field"
        @input="setCurrentRowPosition"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.type-field {
  border-radius: 8px;
  overflow: hidden;
}

.typing-area {
  border-radius: 8px;
  position: relative;

  padding: 32px;
  user-select: none;

  min-height: 300px;
}

.pseudo-text-area {
  margin: 32px;
  position: absolute;
  top: -2px;
  left: 2px;
  pointer-events: none;
}

.correct {
  color: #00ff00;
}

.incorrect {
  color: #ff0000;
}

/* .hidden {
  position: absolute;
  top: -1000px;
  left: -1000px;
  opacity: 0;
  pointer-events: none;
} */
</style>
