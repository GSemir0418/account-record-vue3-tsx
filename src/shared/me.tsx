import { AxiosResponse } from "axios";
import { http } from "./HttpClient";

export let mePromise:
  | Promise<
      AxiosResponse<
        {
          resources: {
            id: number;
          };
        },
        any
      >
    >
  | undefined;
export const refreshMe = () => {
  mePromise = http.get<{ resources: { id: number } }>("/me");
  return mePromise;
};
export const fetchMe = refreshMe;
