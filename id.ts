const chars = "awsg6x9h34j572uqr8feckz";

export const encode = (id: number) => {
  if (id < 0) {
    throw new Error("id cannot be negative");
  }

  const [first, ...rest] = [2, 1, 0].map(
    (pos) => Math.floor(id / chars.length ** pos) % chars.length
  );

  if (first > 0) {
    throw new Error("id is too large");
  }

  return rest.map((i) => chars.at(i)).join("");
};

export const decode = (code: string) => {
  if (code.length !== 2 || code.split("").some((c) => !chars.includes(c))) {
    throw new Error("invalid code");
  }

  const [first, second] = code.split("").map((c) => chars.indexOf(c));

  return first * chars.length + second;
};
