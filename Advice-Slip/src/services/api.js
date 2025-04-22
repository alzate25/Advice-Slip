export const getRandomAdvice = async () => {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    return data.slip;
  };
  
  export const searchAdvice = async (query) => {
    const res = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
    const data = await res.json();
    return data.slips || [];
  };
  