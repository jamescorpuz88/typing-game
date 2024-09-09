<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    selectedTab: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedTab: this.selectedTab
    }
  },
  methods: {
    handleTabClick(index) {
      this.$emit('selectNewTab', index)
      console.log(`You clicked on tab ${index} \nNot implemented yet`)
    }
  },
  watch: {
    selectedTab(newVal) {
      this.selectedTab = newVal
      console.log(newVal)
    }
  }
}
</script>

<template>
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index">
        <div v-if="selectedTab == index" class="tab selected container" @click="handleTabClick(index)">
          {{ tab }}
        </div>
        <div v-else class="tab container" @click="handleTabClick(index)">
          {{ tab }}
        </div>
      </div>
    </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  margin-left: 8px;
  gap: 2px;
}

.tab {
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 4px;
  padding-left: 16px;
  padding-right: 16px;

  width: fit-content;
  cursor: pointer;

  p {
    margin: 4px 16px;
  }
}

.selected {
  background-color: var(--color-background-mute);
}
</style>
