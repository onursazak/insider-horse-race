<template>
  <section class="schedule-and-results">
    <ScheduleList />
    <ResultList />
  </section>
</template>

<script setup>
import ResultList from '@/components/schedule-and-results/result-list.vue';
import ScheduleList from '@/components/schedule-and-results/schedule-list.vue';
</script>

<style lang="scss" scoped>
.schedule-and-results {
  display: flex;
}
</style>
