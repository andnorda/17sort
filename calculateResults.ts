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

export const calculateInsertions = (numbers: number[]): Insertion[] => {
  const lis = longestIncreasingSubsequence(numbers);
  const from = numbers.findIndex((n) => !lis.includes(n));
  if (from === -1) {
    return [];
  } else {
    const larger = lis.find((l) => l > numbers[from])!;
    if (larger) {
      let to = numbers.indexOf(larger);
      if (to > from) {
        to = to - 1;
      }
      const newArray = numbers
        .toSpliced(from, 1)
        .toSpliced(to, 0, numbers[from]);
      const isSorted = newArray.every(
        (n, i) => i === 0 || n >= newArray[i - 1]
      );
      return [
        {
          from,
          to,
          cost: Math.max(
            ...numbers
              .slice(Math.min(from + 1, to), Math.max(from, to + 1))
              .map((n) => Math.abs(n - numbers[from]))
          ),
        },
        ...(isSorted ? [] : calculateInsertions(newArray)),
      ];
    } else {
      const largest = Math.max(...lis);
      const to = numbers.indexOf(largest);
      return [{ from, to, cost: numbers[from] - numbers[from + 1] }];
    }
  }
};
