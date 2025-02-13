import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchHorseList } from '@/services/api';
import { createSchedule, updateResultListByRound } from '@/components/helpers/schedule';

export const useHorseRaceStore = defineStore('horse-race', () => {
  const horseList = ref();
  const scheduleList = ref(createSchedule());
  const resultList = ref(createSchedule());

  const currentRoundIndex = ref(0);
  const isInProgress = ref(false);
  const scheduleGenerationCount = ref(0);

  const currentRound = computed(() => scheduleList.value[currentRoundIndex.value]);

  async function fetchHorses() {
    try {
      horseList.value = await fetchHorseList();
    } catch (error) {
      console.error('Error fetching horses:', error);
    }
  }

  function setHorseFinishRace(index) {
    scheduleList.value[currentRoundIndex.value].list[index].completed = true;
    if (checkRoundCompletion()) {
      stop();
      resultList.value = updateResultListByRound(
        scheduleList.value,
        resultList.value,
        currentRoundIndex.value,
      );
      if (currentRoundIndex.value < 5) {
        switchToNextRound();
        setTimeout(() => start(), 50);
      }
    }
  }

  function checkRoundCompletion() {
    const isCompleted = scheduleList.value[currentRoundIndex.value].list.every(
      (horse) => horse.completed,
    );
    scheduleList.value[currentRoundIndex.value].completed = isCompleted;
    return isCompleted;
  }

  function switchToNextRound() {
    currentRoundIndex.value += 1;
  }
  function generateSchedule() {
    scheduleGenerationCount.value += 1;
    scheduleList.value = createSchedule(horseList.value);
  }
  async function start() {
    isInProgress.value = true;
  }
  function stop() {
    isInProgress.value = false;
  }

  async function reset() {
    await fetchHorses();
    scheduleList.value = createSchedule();
    resultList.value = createSchedule();
    currentRoundIndex.value = 0;
    isInProgress.value = false;
    scheduleGenerationCount.value = 0;
  }

  return {
    horseList,
    fetchHorses,
    generateSchedule,
    scheduleList,
    resultList,
    switchToNextRound,
    currentRound,
    isInProgress,
    scheduleGenerationCount,
    start,
    stop,
    reset,
    setHorseFinishRace,
    currentRoundIndex,
  };
});
