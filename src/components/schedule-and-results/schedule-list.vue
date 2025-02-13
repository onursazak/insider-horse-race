<template>
  <div class="schedule-list">
    <h2 class="title">Program</h2>
    <div class="schedule-content">
      <div v-for="schedule in horseRaceStore.scheduleList" :key="schedule?.raceType">
        <h3 class="description">{{ schedule?.description }}</h3>
        <el-table :data="schedule?.list" style="width: 100%">
          <el-table-column prop="position" label="Position" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHorseRaceStore } from '@/stores/global';
const horseRaceStore = useHorseRaceStore();
</script>

<style lang="scss" scoped>
.schedule-list {
  .title {
    text-align: center;
    background: rgba(0, 0, 255, 0.608);
    padding: 8px;
  }
  .description {
    text-align: center;
    background: rgba(255, 0, 0, 0.563);
    padding: 8px;
  }
  .schedule-content {
    max-height: 955px;
    overflow-y: auto;
  }
}
</style>
