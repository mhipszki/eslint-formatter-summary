export type Rule = { ruleId: string; errors: number; warnings: number };

export const lengthOfLongest = (prop: keyof Rule, items: Rule[]) =>
  items.reduce(
    (length, item) =>
      typeof item[prop] !== 'undefined'
        ? Math.max(length, (item[prop] ?? 0).toString().length)
        : length,
    0,
  );
