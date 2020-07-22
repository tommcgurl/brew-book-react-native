const persistState = async (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value)
  localStorage.setItem(key, stringifiedValue);
}

export default persistState;
