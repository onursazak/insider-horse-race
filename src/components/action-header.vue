<template>
  <header class="action-header">
    <h1>Horse Racing</h1>
    <div class="action-buttons">
      <el-button @click="generateSchedule">Generate program</el-button>
      <el-button @click="start" :disabled="horseRaceStore.scheduleGenerationCount < 1">
        start
      </el-button>
      <el-button @click="reset">reset</el-button>
    </div>
  </header>
</template>

<script setup>
import { useHorseRaceStore } from '@/stores/global';

const horseRaceStore = useHorseRaceStore();
const generateSchedule = () => horseRaceStore.generateSchedule();
const start = async () => {
  if (horseRaceStore.currentRoundIndex === 5) {
    await horseRaceStore.reset();
    horseRaceStore.generateSchedule();
  }
  setTimeout(() => horseRaceStore.start(), 50);
};
const reset = () => horseRaceStore.reset();
</script>

<style lang="scss" scoped>
.action-header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 102, 0, 0.834);
}
.action-buttons {
  display: flex;
  gap: 16px;
}
</style>
