import axios from "axios";
import { IP_FOR_API } from '@env';

const api = axios.create({
  baseURL: `http://${IP_FOR_API}:3333`,
});

export default api;