import axios from 'axios';
export const setHeader = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] =`${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}
export default setHeader;