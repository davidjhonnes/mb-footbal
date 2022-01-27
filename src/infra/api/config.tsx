import axios from "axios";

export const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3"
export const HEADERS = {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': '596089d457msh3fb96add2148d90p1ca94cjsn83ba015726ba'
  }

var options = {
    baseURL: BASE_URL,
    headers: HEADERS,
    timeout: 30000
};

const api = axios.create(options)

export default api
