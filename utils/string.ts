export const checkIfNumber = (candidateValue: string) =>
  Number(candidateValue) >= 0 && Number(candidateValue) <= 9;

export const checkIfStrinNumber = (str: string) => {
  return str.split('').every((num: string) => checkIfNumber(num));
};
