const padNumber = (num: string) => (num.length === 1 ? `0${num}` : num);

const stringifyTime = (total: number): string => {
  let minutes = padNumber(Math.floor(total / 60).toString());
  let seconds = padNumber((total % 60).toString());
  return `${minutes}:${seconds}`;
};

export default stringifyTime;
