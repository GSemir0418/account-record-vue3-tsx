import { AxiosResponse } from "axios";
import { mockSession } from "./mockSession";

export const mock = (response: AxiosResponse) => {
  // 如果不是本地开发环境的host，那么不会mock数据
  if (
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "192.168.3.57"
  )
    return false;
  // _m就是mock的标识
  switch (response.config?.params._m) {
    case "session":
      // 状态码和响应体就是mock出来的数据
      [response.status, response.data] = mockSession(response.config);
      console.log("完成mock", response);
      return true;
  }
  return false;
};
