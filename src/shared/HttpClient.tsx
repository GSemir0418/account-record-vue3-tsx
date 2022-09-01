import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { mock } from "../mock/mock";
type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };
export class HttpClient {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  // 泛型表示返回值的类型
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "params" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "get",
    });
  }
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "post",
    });
  }
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "patch",
    });
  }
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new HttpClient("/api/v1");
// 拦截器
http.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});
http.instance.interceptors.response.use(
  (resp) => {
    mock(resp);
    return resp;
  },
  (error) => {
    // 对请求失败的情况也尝试mock
    if (mock(error)) {
      // return表示错误已被解决
      return error;
    } else {
      // throw表示此处并没有解决错误
      throw error;
    }
  }
);
http.instance.interceptors.response.use(
  (response) => {
    console.log("没意义的响应拦截", response);
    // 记得return 否则会阻塞在这
    return response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert("你太频繁了");
      }
    }
    throw error;
  }
);
