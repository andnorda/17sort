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

  const getTo = (from: number) => {
    const larger = lis.find((l) => l > numbers[from])!;
    const to = numbers.indexOf(larger);
    if (larger) {
      if (to > from) {
        return to - 1;
      } else {
        return to;
      }
    } else {
      return numbers.indexOf(Math.max(...lis));
    }
  };

  const allFrom = numbers
    .map((n, i) => (lis.includes(n) ? undefined : i))
    .filter((i) => i !== undefined);
  if (allFrom.length === 0) {
    return [];
  }
  const diff = allFrom.map((from) => getTo(from) - from);
  const from = diff.every((d) => d > 0)
    ? Math.max(...allFrom)
    : Math.min(...allFrom);
  const to = getTo(from);

  if (from === -1) {
    return [];
  } else {
    const newArray = numbers.toSpliced(from, 1).toSpliced(to, 0, numbers[from]);
    const isSorted = newArray.every((n, i) => i === 0 || n >= newArray[i - 1]);
    const cost = Math.max(
      ...numbers
        .slice(Math.min(from + 1, to), Math.max(from, to + 1))
        .map((n) => Math.abs(n - numbers[from]))
    );

    console.log({
      numbers,
      from,
      to,
      allFrom,
      diff,
      cost,
      dist: Math.abs(to - from),
      newArray,
    });
    return [
      {
        from,
        to,
        cost,
      },
      ...(isSorted ? [] : calculateInsertions(newArray)),
    ];
  }
};
