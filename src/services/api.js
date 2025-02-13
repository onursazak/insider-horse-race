import { generateRandomNumberInRange } from '@/utils/utils';

const fetchHorseList = async () => {
  const horseNames = [
    'Thunder',
    'Lightning',
    'Storm',
    'Blaze',
    'Shadow',
    'Spirit',
    'Majesty',
    'Comet',
    'Whisper',
    'Mystic',
    'Flash',
    'Bolt',
    'Gale',
    'Hurricane',
    'Tornado',
    'Cyclone',
    'Zephyr',
    'Tempest',
    'Breeze',
    'Gust',
  ];
  const horseColors = [
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'orange',
    'pink',
    'gold',
    'cyan',
    'magenta',
    'lime',
    'coral',
    'salmon',
    'beige',
    'ivory',
    'peach',
    'lavender',
    'aqua',
    'skyblue',
    'mintcream',
  ];

  const horseList = horseNames.slice(0, generateRandomNumberInRange(10, 19)).map((name, index) => ({
    id: index + 1,
    name,
    condition: generateRandomNumberInRange(70, 99),
    color: horseColors[index],
  }));
  return horseList;
};

export { fetchHorseList };
