<template>
  <div class="result-list">
    <h2 class="title">Result</h2>
    <div class="result-content">
      <template v-if="horseRaceStore.resultList">
        <div v-for="result in horseRaceStore.resultList" :key="result.raceType">
          <h3 class="description">{{ result.description }}</h3>
          <el-table :data="result.list" style="width: 100%">
            <el-table-column type="index" :index="(i) => i + 1" label="Position" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useHorseRaceStore } from '@/stores/global';
const horseRaceStore = useHorseRaceStore();
</script>

<style lang="scss" scoped>
.result-list {
  .title {
    text-align: center;
    background: rgba(0, 128, 0, 0.717);
    padding: 8px;
  }
  .description {
    text-align: center;
    background: rgba(255, 0, 0, 0.563);
    padding: 8px;
  }
  .result-content {
    max-height: 955px;
    overflow-y: auto;
  }
}
</style>
