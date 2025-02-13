import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useHorseRaceStore } from '@/stores/global';
import { fetchHorseList } from '@/services/api';
import { createSchedule } from '@/components/helpers/schedule';

vi.mock('@/services/api', () => ({
  fetchHorseList: vi.fn(),
}));

vi.mock('@/components/helpers/schedule', () => ({
  createSchedule: vi.fn(() => [{ list: [{ completed: false }], completed: false }]),
  updateResultListByRound: vi.fn((schedule, results) => results),
}));

describe('useHorseRaceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const store = useHorseRaceStore();
    expect(store.horseList).toBeUndefined();
    expect(store.scheduleList).toEqual([{ list: [{ completed: false }], completed: false }]);
    expect(store.resultList).toEqual([{ list: [{ completed: false }], completed: false }]);
    expect(store.currentRoundIndex).toBe(0);
    expect(store.isInProgress).toBe(false);
    expect(store.scheduleGenerationCount).toBe(0);
  });

  it('fetches horses and updates horseList', async () => {
    const store = useHorseRaceStore();
    const mockHorses = [{ name: 'Thunder' }, { name: 'Lightning' }];
    fetchHorseList.mockResolvedValue(mockHorses);

    await store.fetchHorses();
    expect(store.horseList).toEqual(mockHorses);
  });

  it('generates a new schedule', () => {
    const store = useHorseRaceStore();
    store.horseList = [{ name: 'Thunder' }];
    store.generateSchedule();

    expect(createSchedule).toHaveBeenCalledWith(store.horseList);
    expect(store.scheduleGenerationCount).toBe(1);
  });

  it('sets horse race completion and switches rounds', () => {
    const store = useHorseRaceStore();
    store.setHorseFinishRace(0);

    expect(store.scheduleList[0].list[0].completed).toBe(true);
    expect(store.scheduleList[0].completed).toBe(true);
  });

  it('switches to the next round', () => {
    const store = useHorseRaceStore();
    store.switchToNextRound();
    expect(store.currentRoundIndex).toBe(1);
  });

  it('starts and stops the race', () => {
    const store = useHorseRaceStore();
    store.start();
    expect(store.isInProgress).toBe(true);

    store.stop();
    expect(store.isInProgress).toBe(false);
  });

  it('resets the race', async () => {
    const store = useHorseRaceStore();
    fetchHorseList.mockResolvedValue([{ name: 'Storm' }]);
    await store.reset();

    expect(store.horseList).toEqual([{ name: 'Storm' }]);
    expect(store.scheduleList).toEqual([{ list: [{ completed: false }], completed: false }]);
    expect(store.resultList).toEqual([{ list: [{ completed: false }], completed: false }]);
    expect(store.currentRoundIndex).toBe(0);
    expect(store.isInProgress).toBe(false);
    expect(store.scheduleGenerationCount).toBe(0);
  });
});
