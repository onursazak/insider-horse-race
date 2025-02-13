<template>
  <section class="horse-list">
    <h2>Horse List (1-20)</h2>
    <el-table :data="horseRaceStore.horseList" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="condition" label="Condition" width="180" />
      <el-table-column prop="color" label="Color" />
    </el-table>
  </section>
</template>

<script setup>
import { useHorseRaceStore } from '@/stores/global';
import { onMounted } from 'vue';

const horseRaceStore = useHorseRaceStore();
onMounted(() => {
  horseRaceStore.fetchHorses();
});
</script>

<style lang="scss" scoped>
.horse-list {
  background-color: yellow;
  h2 {
    padding: 16px;
    margin-bottom: 0;
  }
}
</style>
