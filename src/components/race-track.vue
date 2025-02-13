<template>
  <section ref="laneRef" class="race-track" :key="horseRaceStore.currentRoundIndex">
    <template v-if="horseRaceStore?.currentRound?.list">
      <div v-for="(horse, index) in horseRaceStore.currentRound.list" :key="horse.id" class="lane">
        <div class="lane-number">{{ index + 1 }}</div>
        <div class="horse" :style="{ color: horse.color, transform: `translateX(${horse.x}px)` }">
          {{ horse.name }}
        </div>
      </div>
    </template>
    <div class="finish-line"></div>
    <div class="track-info">{{ horseRaceStore?.currentRound?.description }}</div>
  </section>
</template>

<script setup>
import { useHorseRaceStore } from '@/stores/global';
import { watch, ref, onMounted, nextTick } from 'vue';

const laneRef = ref();
const trackLength = ref(500);
const horseRaceStore = useHorseRaceStore();

const animateHorse = (horse, index) => {
  const startTime = performance.now();
  const duration = 3000 / (horse.condition / 100);

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    horse.x = progress * trackLength.value;

    if (progress >= 1) {
      horseRaceStore.setHorseFinishRace(index);
      return;
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

watch(
  () => horseRaceStore.isInProgress,
  () => {
    if (!horseRaceStore.isInProgress) return;

    horseRaceStore?.currentRound?.list.forEach(animateHorse);
  },
);

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      trackLength.value = laneRef.value.getBoundingClientRect().width - 100;
    }, 50);
  });
});
</script>

<style scoped lang="scss">
.race-track {
  position: relative;
  width: 600px;
  padding: 0 10px 10px 10px;
}
.lane {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
  border-top: 2px dashed gray;
  border-bottom: 2px dashed gray;
}
.lane-number {
  background: green;
  color: white;
  padding: 8px;
  font-size: 16px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
  margin-right: 10px;
}
.horse {
  border-radius: 8px;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.101);
  padding: 4px;
}
.finish-line {
  position: relative;
  &::after {
    content: 'Finish';
    position: absolute;
    bottom: -20px;
    left: -20px;
    color: rgba(255, 0, 0, 0.737);
    font-size: 20px;
    font-weight: 500;
  }
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
  height: 456px;
  background: red;
}
.track-info {
  font-size: 24px;
  font-weight: 600;
  color: rgba(255, 0, 0, 0.737);
}
</style>
