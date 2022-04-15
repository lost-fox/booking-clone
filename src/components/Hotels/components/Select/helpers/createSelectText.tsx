export const createSelectText = (values: number[], options: string[]) => {
  return options.map((val, i) => `${val} ${values[i]}`).join(", ");
};
