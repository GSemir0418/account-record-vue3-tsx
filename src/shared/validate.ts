export type Rule<T> = {
  // 当Rule类型接收到表单数据的泛型T时，此时的key就是T中的key
  // key: string;
  key: keyof T;
  message: string;
} & ({ type: "pattern"; regExp: RegExp } | { type: "required" });
// 对于表格数据，key和value都不是提前定义的，所以只能暂时定义为一个普通对象的形式
// 要注意其值也有可能是一个对象，可以循环使用FData类型
export interface FData {
  [k: string]: string | number | null | undefined | FData;
}
export type Errors<T> = {
  // 将FData中的key与Error中的key对应起来
  [k in keyof T]?: string[];
};
// 在箭头函数前添加泛型<T>，继承自FData，并将T作为参数传给Rule类型
export const validate = <T extends FData>(data: T, rules: Rule<T>[]) => {
  const errors: Errors<T> = {};
  rules.forEach((rule) => {
    const { key, message, type } = rule;
    const value = data[key];
    if (type === "required") {
      if (!value && value === "") {
        // 初始化为一个数组
        errors[key] = errors[key] ?? [];
        errors[key]?.push(message);
      }
    } else if (type === "pattern") {
      if (value && !rule.regExp.test(value.toString())) {
        // 初始化为一个数组
        errors[key] = errors[key] ?? [];
        errors[key]?.push(message);
      }
    }
  });
  return errors;
};
export const hasErrors = (errors: Record<string, string[]>) => {
  let result = false;
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true;
      break;
    }
  }
  return result;
};
