export const getRandomAdvice = async () => {
  const res = await fetch('https://api.adviceslip.com/advice', { cache: "no-cache" });
  const data = await res.json();
  return data.slip;
};

export const searchAdvice = async (query) => {
  const res = await fetch(`https://api.adviceslip.com/advice/search/${query}`, { cache: "no-cache" });
  const data = await res.json();
  return data.slips || [];
};
