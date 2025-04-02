export const getZodiacAndHoroscope = (
  birthday: Date,
): { zodiac: string; horoscope: string } => {
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();

  const zodiacSigns = [
    { sign: 'Capricornus', horoscope: 'Goat', start: [12, 22], end: [1, 19] },
    {
      sign: 'Aquarius',
      horoscope: 'Water Bearer',
      start: [1, 20],
      end: [2, 18],
    },
    { sign: 'Pisces', horoscope: 'Fish', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', horoscope: 'Ram', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', horoscope: 'Bull', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', horoscope: 'Twins', start: [5, 21], end: [6, 21] },
    { sign: 'Cancer', horoscope: 'Crab', start: [6, 22], end: [7, 22] },
    { sign: 'Leo', horoscope: 'Lion', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', horoscope: 'Virgin', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', horoscope: 'Balance', start: [9, 23], end: [10, 23] },
    { sign: 'Scorpius', horoscope: 'Scorpion', start: [10, 24], end: [11, 21] },
    {
      sign: 'Sagittarius',
      horoscope: 'Archer',
      start: [11, 22],
      end: [12, 21],
    },
  ];

  const zodiacData = zodiacSigns.find(
    ({ start, end }) =>
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1]),
  );

  return {
    zodiac: zodiacData?.sign || 'Unknown',
    horoscope: zodiacData?.horoscope || 'Unknown',
  };
};
