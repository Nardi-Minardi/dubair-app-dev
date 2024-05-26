export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await localStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error(e);
  }
};



export const getData = async (key) => {
  try {
    const jsonValue = await localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
