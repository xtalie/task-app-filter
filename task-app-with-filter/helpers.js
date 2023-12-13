export const createDate = () => {
  return new Date().toLocaleDateString("en-GB",{day: "numeric", month:"short", year:"numeric"});
};