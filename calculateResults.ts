export interface Insertion {
  from: number;
  to: number;
  cost: number;
}

const longestIncreasingSubsequence = (numbers: number[]): number[] => {
  const dp = Array(numbers.length).fill(1);
  const prev = Array(numbers.length).fill(-1);

  let maxLength = 0;
  let maxIndex = -1;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > maxLength) {
      maxLength = dp[i];
      maxIndex = i;
    }
  }

  const lis = [];
  while (maxIndex !== -1) {
    lis.unshift(numbers[maxIndex]);
    maxIndex = prev[maxIndex];
  }

  return lis;
};

export const calculateInsertions = (
  numbers: number[],
  lis = longestIncreasingSubsequence(numbers)
): Insertion[] => {
  if (numbers.length === lis.length) {
    return [];
  }

  const getTo = (from: number) => {
    const to = numbers.findIndex((n) => lis.includes(n) && n > numbers[from]);
    if (to === -1) {
      return numbers.length - 1;
    }
    if (to > from) {
      return to - 1;
    }
    return to;
  };

  const getFrom = () => {
    const allFrom = numbers
      .map((n, i) => (lis.includes(n) ? undefined : i))
      .filter((i) => i !== undefined);

    return allFrom.some((from) => from > getTo(from))
      ? allFrom.some((from) => from < getTo(from))
        ? allFrom.find(
            (_, i, array) =>
              array
                .map((from) => Math.abs(getTo(from) - from))
                .findIndex((d, _, a) => d === Math.min(...a)) === i
          )!
        : Math.min(...allFrom)
      : Math.max(...allFrom);
  };

  const from = getFrom();
  const to = getTo(from);

  return [
    {
      from,
      to,
      cost: Math.max(
        ...numbers
          .slice(Math.min(from, to), Math.max(from, to))
          .map((n) => Math.abs(n - numbers[from]))
      ),
    },
    ...calculateInsertions(
      numbers.toSpliced(from, 1).toSpliced(to, 0, numbers[from]),
      [...lis, numbers[from]].toSorted()
    ),
  ];
};
