import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config?: AxiosRequestConfig) => [number, any];
faker.setLocale("zh_CN");

export const mockItemCreate: Mock = (config) => {
  return [200, { resource: JSON.parse(config?.data) }];
};
