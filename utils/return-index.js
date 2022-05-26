export const returnIndex = (numberOfItem, length) => {
  if (numberOfItem <= length) {
    return numberOfItem - 1;
  } else {
    return returnIndex(numberOfItem - length, length);
  }
};

// returns the index for an item that is iterating through a static sized array
// array length = 5, want to populate the 15th classroom with array element
// returns index: 4

