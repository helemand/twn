import axios, { AxiosResponse } from "axios";
import { Article, Persons } from "./types";
import { convertPersonalCodeToDate } from "./assets/utils";

const ApiClient = axios.create({
  baseURL: "https://midaiganes.irw.ee/api",
});

export const api = {
  get: <T>(path: string) =>
    ApiClient.get(path).then((response: AxiosResponse<T>) => response.data),
};

export const getArticleData = (id: string) => api.get<Article>(`/list/${id}`);

export const getTableData = () =>
  api.get<Persons>("/list?limit=500").then((data) => {
    if (data && data.list) {
      return {
        ...data,
        list: data.list.map((e) => ({
          ...e,
          birthday: convertPersonalCodeToDate(String(e.personal_code)),
        })),
      };
    }
    return data;
  });
