// function for displaying x labels
const getXLabelsIntervals = (value: string, index: number) => {
  // display only first, fifth, tenth, fifteenth, twentieth and last label
  const from_0_to_23 =
    index === 2 || index === 7 || index === 12 || index === 17 || index === 23;

  return from_0_to_23;
};

export { getXLabelsIntervals };
