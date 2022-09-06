import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config?: AxiosRequestConfig) => [number, any];
export const mockTagShow: Mock = () => {
  return [
    200,
    {
      resource: {
        id: faker.random.numeric(1),
        name: "fake",
        sign: "🖖",
        kind: "expenses",
      },
    },
  ];
};
