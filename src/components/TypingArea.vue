<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      INPUT_CHARACTERS:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;\':",./<>? ',
      current_typings: '',
      processed_typings: '',
      reference_text: '',
      display_text: ''
    }
  },
  methods: {
    setupText(newText) {
      this.reference_text = newText.split('\n').map((line) => line.replace('\t', ''))
      this.display_text = this.reference_text.map((line) => line.replace(/Æ/g, '\t'))
      this.processed_typings = Array(this.reference_text.length).fill('')
    },

    processInput() {
      this.$refs['play-field'].focus()
      this.processed_typings = this.current_typings.split('\n')

      // Check if the user has completed the typing test
      if (this.reference_text.join('') === this.processed_typings.join('')) {
        alert('You have completed the typing test!')
        this.resetTyping();
        this.$emit('getNewProblem');
        return;
      }
    },

    checkInput(e) {
      if (e.key === 'Tab') {
        e.preventDefault()
        this.current_typings += 'Æ'
        this.processInput()
      }

      if (this.INPUT_CHARACTERS.includes(e.key) || e.key === 'Enter') {
        if (!this.$refs['play-field'].matches(':focus')) {
          this.current_typings += e.key === 'Enter' ? '\n' : e.key
        }
        this.processInput()
        this.$refs['play-field'].focus()
      }

      console.log(this.processed_typings, this.reference_text)
    },

    resetTyping() {
      // Reset typing states
      this.current_typings = '';
      this.processed_typings = Array(this.reference_text.length).fill(''); // Ensure same length
      this.$nextTick(() => {
        const playField = this.$refs['play-field'];
        playField.focus(); // Refocus textarea
        playField.setSelectionRange(0, 0); // Set cursor to the beginning
      });
    },

    getCharacterClass(row, column) {
      const referenceChar = this.reference_text[row][column]
      const typedLine = this.processed_typings[row] || ''
      const typedChar = typedLine[column]

      if (typedChar === undefined) {
        return 'pending' // Character has not been typed yet
      }

      if (typedChar === referenceChar) {
        return 'correct' // Character is correct
      } else {
        return 'incorrect' // Character is incorrect
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.checkInput)
    this.$refs['play-field'].focus()
    this.setupText(this.text);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.checkInput)
  },
  watch: {
    text(newValue) {
      this.setupText(newValue);
    }
  }
}
</script>

<template>
  <div class="typing-area container-muted">
    <div class="pseudo-text-area">
      <div v-for="(line, row) in display_text" :key="row">
        <span v-for="(char, column) in line" :key="column" :class="getCharacterClass(row, column)">
          <span v-if="char === '\t'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span v-else>{{ char }}</span>
        </span>
      </div>
      <textarea
        class="hidden"
        v-model="current_typings"
        ref="play-field"
        @input="processInput"
      ></textarea>
    </div>

    <!-- <button @click="$emit('getNewProblem')"></button> -->
  </div>
</template>

<style>
.hidden {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

button {
  margin-top: 128px;
}
</style>
