export const getCreatedTime = (time: string) => {
  const newTime = new Date(time);
  return `${newTime.getHours()}:${
    newTime.getMinutes() < 10 ? `0${newTime.getMinutes()}` : `${newTime.getMinutes()}`
  }`;
};
