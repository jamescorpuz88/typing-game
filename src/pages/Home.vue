<script>
import Tabs from '@/components/Tabs.vue';
import TypingArea from '@/components/TypingArea.vue';
import { problems } from '@/codingJsProblems';

export default {
  name: 'Home',
  components: {
    Tabs,
    TypingArea
  },
  data() {
    return {
      tabItems: ['typing.js', 'index.html', 'style.css'],
      typingText: problems[Math.floor(Math.random() * problems.length)],
    }
  },
  methods: {
    randomizeProblem() {
      const randomIndex = Math.floor(Math.random() * problems.length);
      this.typingText = problems[randomIndex];

      console.log(this.typingText);
    },
  },
  mounted() {
    this.randomizeProblem();
  },
}
</script>

<template @input="checkInput">
  <div class="type-field">
    <Tabs :tabs="tabItems" />
    <TypingArea :text="typingText" @get-new-problem="randomizeProblem" />
  </div>
</template>

<style scoped></style>
