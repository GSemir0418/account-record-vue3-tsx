import { AxiosResponse } from "axios";
import { http } from "./HttpClient";

// 调整一下路由守卫 方便mock
// 其实还可以mock一下'/me'接口，懒得写了
export let mePromise:
  | Promise<any>
  // | Promise<
  //     AxiosResponse<
  //       {
  //         resources: {
  //           id: number;
  //         };
  //       },
  //       any
  //     >
  //   >
  | undefined;
export const refreshMe = () => {
  // mePromise = http.get<{ resources: { id: number } }>("/me");
  mePromise = Promise.resolve();
  return mePromise;
};
export const fetchMe = refreshMe;
