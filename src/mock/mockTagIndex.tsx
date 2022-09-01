import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config?: AxiosRequestConfig) => [number, any];
type CreateItem = (
  config: AxiosRequestConfig | undefined,
  n: number,
  attr?: any
) => Tag[];
faker.setLocale("zh_CN");
// 自动生成tags
const createItem: CreateItem = (config, n = 1, attr) => {
  let id = 1;
  const createId = () => (id += 1);
  return Array.from({ length: n }).map(() => ({
    id: createId(),
    kind: config?.params.kind,
    sign: faker.internet.emoji(),
    name: faker.random.word(),
    ...attr,
  }));
};

export const mockTagIndex: Mock = (config) => {
  if (config?.params.kind === "expenses") {
    return [200, { resources: createItem(config, 20) }];
  } else {
    return [200, { resources: createItem(config, 10) }];
  }
};
