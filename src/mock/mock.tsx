import { AxiosResponse } from "axios";
import { mockItemCreate } from "./mockItemCreate";
import { mockSession } from "./mockSession";
import { mockTagIndex } from "./mockTagIndex";
import { mockTagShow } from "./mockTagShow";

export const mock = (response: AxiosResponse) => {
  // 如果不是本地开发环境的host，那么不会mock数据
  if (
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "192.168.3.57"
  )
    return false;
  // _m就是mock的标识
  switch (response.config?.params?._m) {
    case "session":
      [response.status, response.data] = mockSession(response.config);
      return true;
    case "tagIndex":
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case "itemCreate":
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case "tagShow":
      [response.status, response.data] = mockTagShow(response.config);
      return true;
  }
  return false;
};
