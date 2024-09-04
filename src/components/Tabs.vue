<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleTabClick(index) {
      alert(`You clicked on tab ${index} \nNot implemented yet`);
    }
  }
}
</script>

<template>
  <div class="tabs">
    <div class="tab container" v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(index)">
      <p>{{ tab }}</p>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  margin-left: 8px;
  gap: 2px;
}

.tab {
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  width: fit-content;
  cursor: pointer;

  p {
    margin: 4px 16px;
  }
}
</style>
