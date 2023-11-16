export function getUserFields() {
  const stringConfig = localStorage.getItem("config");
  const config = stringConfig ? JSON.parse(stringConfig) : null;
  return config ? config.fields : [];
}