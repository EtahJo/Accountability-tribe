import emojiFlags from 'emoji-flags';

const CountryFlag = ({ countryCode }: { countryCode: string }) => {
  const country = emojiFlags.countryCode(countryCode);
  return <span>{country ? country.emoji : '🏳️'}</span>;
};

export default CountryFlag;
