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
            <span v-if="char === '\t' && getCharacterClass(row, column) === 'incorrect'">{{
              '___'
            }}</span>
            <span v-else-if="char === '\t'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-else-if="char === ' ' && getCharacterClass(row, column) === 'incorrect'">{{
              '_'
            }}</span>
            <span v-else>{{ char }}</span>
          </span>
        </div>
      </div>

      <textarea
        class="hidden"
        v-model="currentTypings"
        ref="play-field"
        v-if="canType"
        @input="processInput"
        @paste="preventPaste"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingArea',
  props: {
    problem: { problem: Object, required: true },
    popupVisible: { type: Boolean, required: true }
  },
  data() {
    return {
      INPUT_CHARACTERS:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;\':",./<>? ',
      currentTypings: '',
      processedInput: [], // Initialize as an empty array
      referenceText: '',
      displayText: '',

      // Game State
      startTime: 0,
      correctCount: 0,
      incorrectCount: 0,
      gameStarted: false,
      gameState: {
        gameState: false,
        startTime: 0,
        correct: 0,
        incorrect: 0,
        total: 0
      },

      // Other State
      canType: true
    }
  },
  setup() {},
  methods: {
    setupText(newText) {
      this.referenceText = newText.split('\n').map((line) => line.replace('\t', ''))

      // Process the reference text for display, while replacing (Æ) with a tab character
      this.displayText = this.referenceText.map((line) => line.replace(/Æ/g, '\t'))
    },

    startGame() {
      this.startTime = Date.now()
      this.gameStarted = true

      this.$emit('gameStart', this.startTime)
    },

    resetGame() {
      this.currentTypings = ''
      this.processedInput = []
      this.gameStarted = false
      this.gameState.gameState = false

      this.$nextTick(() => {
        const playField = this.$refs['play-field']
        playField.focus()
        playField.setSelectionRange(0, 0)
      })
    },

    checkInput(e) {
      if (this.popupVisible) return

      if (e.key === 'Tab') {
        this.currentTypings += 'Æ'

        // Prevent the default tab behavior
        e.preventDefault()
      }

      if (this.INPUT_CHARACTERS.includes(e.key) || e.key === 'Enter') {
        // Handle Start Game Here
        if (!this.gameStarted) {
          this.startGame()
        }

        // Apply the key press to the current typings
        if (!this.$refs['play-field'].matches(':focus')) {
          if (e.key === 'Enter') {
            this.currentTypings += '\n'
          }
          this.$refs['play-field'].focus()
        }
      }

      this.processInput()
    },

    processInput() {
      this.processedInput = this.currentTypings.split('\n')

      // Remove trailing text past column index
      this.processedInput = this.processedInput.map((line, index) => {
        return line.slice(0, this.referenceText[index].length)
      })

      // Check if game is over
      if (this.referenceText.join('') === this.processedInput.join('')) {
        this.resetGame()
        this.$emit('gameFinish')
      }

      // Count correct and incorrect characters
      this.trackCorrectness()
    },

    preventPaste(e) {
      e.preventDefault()
    },

    trackCorrectness() {
      const joinedInput = this.processedInput.join('')
      const joinedReference = this.referenceText.join('')

      var correctCount = 0
      var incorrectCount = 0

      joinedInput.split('').forEach((char, index) => {
        if (char !== joinedReference[index]) {
          incorrectCount++
        } else {
          correctCount++
        }
      })

      this.correctCount = correctCount
      this.incorrectCount = incorrectCount

      const newGameState = {
        gameState: this.gameStarted,
        correct: this.correctCount,
        incorrect: this.incorrectCount,
        total: this.processedInput.join('').length
      }

      this.gameState = newGameState
      this.$emit('updateGameData', this.gameState)
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
    },
    popupVisible(newVisibility) {
      this.canType = !newVisibility
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
