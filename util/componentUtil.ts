// deno-lint-ignore no-explicit-any
export function take<O extends { [key: string]: any }, K extends keyof O>(
  object: O,
  key: K,
): O[K] {
  const value = object[key];
  delete object[key];
  return value;
}
