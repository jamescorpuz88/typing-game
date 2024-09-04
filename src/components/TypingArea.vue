<template>
  <div class="typing-area container-muted">
    <div class="breadcrumbs">
      <p>{{ problem.breadcrumbs }}</p>
    </div>
    <div class="pseudo-text-area">
      <div class="number-rule">
        <p v-for="(line, index) in displayText">
          {{ index + 1 }}
        </p>
      </div>
      <div class="display-text">
        <div v-for="(line, row) in displayText" :key="row">
          <span
            v-for="(char, column) in line"
            :key="column"
            :class="getCharacterClass(row, column)"
          >
            <span v-if="char === '\t'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-else>{{ char }}</span>
          </span>
        </div>
      </div>

      <textarea
        class="hidden"
        v-model="currentTypings"
        ref="play-field"
        @input="processInput"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingArea',
  props: {
    problem: { problem: Object, required: true }
  },
  data() {
    return {
      INPUT_CHARACTERS:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;\':",./<>? ',
      currentTypings: '',
      processedInput: '',
      referenceText: '',
      displayText: '',
      startTime: 0,
      gameStarted: false
    }
  },
  methods: {
    setupText(newText) {
      this.referenceText = newText.split('\n').map((line) => line.replace('\t', ''))

      // Process the reference text for display, while replacing (Æ) with a tab character
      this.displayText = this.referenceText.map((line) => line.replace(/Æ/g, '\t'))
    },

    startGame() {
      this.startTime = Date.now()
      this.gameStarted = true
    },

    resetGame() {
      this.currentTypings = ''
      this.processedInput = ''

      this.$nextTick(() => {
        const playField = this.$refs['play-field']
        playField.focus()
        playField.setSelectionRange(0, 0)
      })
    },

    checkInput(e) {
      if (e.key === 'Tab') {
        this.currentTypings += 'Æ'

        // Prevent the default tab behavior
        e.preventDefault()
      }

      if (this.INPUT_CHARACTERS.includes(e.key) || e.key === 'Enter') {
        // Handle Start Game Here
        if (!this.start_game) this.startGame()

        // Apply the key press to the current typings
        if (!this.$refs['play-field'].matches(':focus')) {
          this.currentTypings += e.key === 'Enter' ? '\n' : e.key
          this.$refs['play-field'].focus()
        }
      }

      this.processInput()
    },

    processInput() {
      this.processedInput = this.currentTypings.split('\n')

      // Check if game is over
      if (this.referenceText.join('') === this.processedInput.join('')) {
        // const timeTaken = (Date.now() - this.startTime) / 1000 / 60
        // const wpm = this.referenceText.join('').length / 5 / timeTaken

        alert('You have completed the typing test!\n')

        this.resetGame()
        // this.$emit('getNewProblem')
      }
    },

    // Handle character color based on correctness
    getCharacterClass(row, column) {
      const referenceChar = this.referenceText[row][column]
      const typedLine = this.processedInput[row] || ''
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
    this.setupText(this.problem.problem)
    this.resetGame()
    this.$refs['play-field'].focus()
  },
  watch: {
    problem(newProblem) {
      this.setupText(newProblem.problem)
    }
  }
}
</script>

<style scoped>
.breadcrumbs {
  color: var(--color-text);
  font-size: 1rem;

  border-bottom: 1px solid #444444;

  p {
    margin-left: 16px;
  }
}

.typing-area {
  border-radius: 8px;
  position: relative;

  user-select: none;

  min-height: 400px;
}

.number-rule {
  color: var(--color-text);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-right: 1px solid #444444;

  p {
    margin-left: 24px;
    margin-right: 8px;
  }
}

.display-text {
  margin-left: 8px;

  display: block;
}

.pseudo-text-area {
  pointer-events: none;

  color: var(--color-text-light);

  display: flex;
  flex-direction: row;
}

.correct {
  color: var(--color-text);
}

.incorrect {
  color: #ff0000;
}

.hidden {
  position: absolute;
  opacity: 0;
}
</style>
