export function useCurrentDateInYYYYMMDD() {
  let today = new Date();
  today =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  return today;
}
