const setGlobalVhValue = (windowHeight) => {
  const root = document.documentElement;
  root.style.setProperty('--vh-val', `${windowHeight / 100}px`);
};

export default setGlobalVhValue;
