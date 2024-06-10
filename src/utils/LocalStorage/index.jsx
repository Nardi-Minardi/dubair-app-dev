import Cookies from 'js-cookie';
import { APP_NAME } from '../../config';

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




export const tokenAuth = () => {
  const cookiesName = `${APP_NAME}-token`;
  const cookies = Cookies.get(cookiesName);
  const token = cookies ? cookies : null;
  if (token) {
    return token;
  }
  return null;
}

