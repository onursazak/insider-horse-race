<template>
  <div class="horse-race-container">
    <ActionHeader />
    <main class="content">
      <HorseList />
      <RaceTrack />
      <ScheduleAndResults />
    </main>
  </div>
</template>

<script setup>
import ActionHeader from '@/components/action-header.vue';
import HorseList from '@/components/horse-list.vue';
import RaceTrack from '@/components/race-track.vue';
import ScheduleAndResults from '@/components/schedule-and-results/schedule-and-results.vue';
</script>

<style lang="scss" scoped>
.horse-race-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-y: hidden;
  gap: 24px;
  > * {
    max-height: 1000px;
    min-height: 500px;
  }
}
</style>
