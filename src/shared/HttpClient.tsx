import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
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
// http.instance.interceptors.request.use(() => {}, () => {});
http.instance.interceptors.response.use(
  (response) => {
    console.log(response);
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