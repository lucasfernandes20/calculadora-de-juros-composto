export interface GrahamValues {
  lpa: number;
  vpa: number;
}

const calcGrahamPrice = ({ lpa, vpa }: GrahamValues): number => {
  const multiply = 22.5;
  return Math.sqrt(multiply * lpa * vpa);
};

export default calcGrahamPrice;
