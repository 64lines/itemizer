export function createDefaultItem(configuration: any) {
  return [...configuration.fields].reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );
}
