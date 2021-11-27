import Axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { API_HOST } from "Constants";

// 기본 url 설정
export const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
