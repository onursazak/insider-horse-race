import { generateRandomNumberInRange } from '@/utils/utils';

const createNewValidRandomIndex = (usedIndexes, horseListLength) => {
  const randomIndex = generateRandomNumberInRange(0, horseListLength - 1);
  if (!usedIndexes.includes(randomIndex)) return randomIndex;
  return createNewValidRandomIndex(usedIndexes, horseListLength);
};

const defaultList = Array.from({ length: 10 }, (_, index) => ({
  position: index + 1,
  name: '-',
}));
const createSchedule = (horseList) => {
  const raceTypes = [1200, 1400, 1600, 1800, 2000, 2200];

  return raceTypes.map((raceType, i) => {
    return {
      description: `${i + 1}st Lap - ${raceType}m`,
      raceType: raceType,
      list: !horseList ? defaultList : getRandomHorses(horseList),
      completed: false,
    };
  });
};

// creates random horse list for each round
const getRandomHorses = (horseList) => {
  const randomHorseList = [];
  const usedIndexes = new Set();

  for (let i = 0; i < 10; i++) {
    const _used = Array.from(usedIndexes);
    const randomIndex = generateRandomNumberInRange(0, horseList.length - 1);

    if (_used.includes(randomIndex)) {
      const newRandomIndex = createNewValidRandomIndex(_used, horseList.length - 1);
      randomHorseList.push({ position: i + 1, ...horseList[newRandomIndex] });
      usedIndexes.add(newRandomIndex);
    } else {
      randomHorseList.push({ position: i + 1, ...horseList[randomIndex] });
      usedIndexes.add(randomIndex);
    }
  }
  return randomHorseList;
};

const updateResultListByRound = (scheduleList, resultList, roundIndex) => {
  const _scheduleList = JSON.parse(JSON.stringify(scheduleList));
  const current = _scheduleList[roundIndex];
  current.list.sort((a, b) => {
    if (a.condition === b.condition) return 0;
    return a.condition < b.condition ? 1 : -1;
  });

  _scheduleList.splice(roundIndex, 1);
  resultList.splice(roundIndex, 1, current);
  return resultList;
};

export { getRandomHorses, createSchedule, updateResultListByRound };
