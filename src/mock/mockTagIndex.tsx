import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config?: AxiosRequestConfig) => [number, any];
type CreateItem = (kind: "expenses" | "income", n: number, attr?: any) => Tag[];
faker.setLocale("zh_CN");
// 自动生成tags
const createItem: CreateItem = (kind, n = 1, attr) => {
  let id = 1;
  const createId = () => (id += 1);
  return Array.from({ length: n }).map(() => ({
    id: createId(),
    kind,
    sign: faker.internet.emoji(),
    name: faker.random.word(),
    ...attr,
  }));
};
// 自动生成pager
const per_page = 25;
const count = 26;
const createPager = (page = 1) => ({
  page,
  per_page,
  count,
});
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config?.params;
  if (kind === "expenses" && (!page || page === 1)) {
    return [
      200,
      {
        resources: createItem(kind, 25),
        pager: createPager(page),
      },
    ];
  } else if (kind === "expenses" && page === 2) {
    return [
      200,
      {
        resources: createItem(kind, 1),
        pager: createPager(page),
      },
    ];
  } else if (kind === "income" && (!page || page === 1)) {
    return [
      200,
      {
        resources: createItem(kind, 25),
        pager: createPager(page),
      },
    ];
  } else if (kind === "income" && page === 2) {
    return [
      200,
      {
        resources: createItem(kind, 2),
        pager: createPager(page),
      },
    ];
  } else {
    return [
      200,
      {
        resources: createItem(kind, 25),
      },
    ];
  }
};
