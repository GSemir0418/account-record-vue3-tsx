/* 
  example
  import { Time } from 'shared/time';
  const time = new Time();
  time.format('YYYY-MM-DD');
  time.firstDayOfMonth();
  time.firstDayOfYear();
  time.lastDayOfMonth();
  time.lastDayOfYear();
  time.add(1, 'month');
*/
export class Time {
  date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  format(pattern = "YYYY-MM-DD") {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    const second = this.date.getSeconds();
    const msecond = this.date.getMilliseconds();
    // 就是用正则替换
    return (
      pattern
        .replace(/YYYY/g, year.toString())
        // padStart和padEnd方法用于字符串长度补全，即用0来补全字符串，保证其有两位字符
        .replace(/MM/, month.toString().padStart(2, "0"))
        .replace(/DD/, day.toString().padStart(2, "0"))
        .replace(/HH/, hour.toString().padStart(2, "0"))
        .replace(/mm/, minute.toString().padStart(2, "0"))
        .replace(/ss/, second.toString().padStart(2, "0"))
        .replace(/SSS/, msecond.toString().padStart(3, "0"))
    );
  }
  firstDayOfMonth() {
    return new Time(
      new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0)
    );
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
  }
  lastDayOfMonth() {
    return new Time(
      new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0)
    );
  }
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0));
  }
  getRaw() {
    return this.date;
  }
  add(
    amount: number,
    unit:
      | "year"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond"
  ) {
    // return new Time but not change this.date
    let date = new Date(this.date.getTime());
    switch (unit) {
      case "year":
        date.setFullYear(date.getFullYear() + amount);
        break;
      case "month":
        // 由于js中理解的下一个月与现实中下一个月不同
        // 例如1.31加一个月之后是3.2而非2.28或2.29
        // 例如10.31加一个月之后是12.1而非11.30
        // 同样的情况均出现在本月（比下个月的天数多）最后一天
        // 思路1：所以如果发现加了amount个月导致月份差值超过amount，那么就返回上个月最后一天
        // 思路2：先处理月份，再对比日期，用较小的那个日期
        const d = date.getDate(); // d = 31; date = 2000.1.31
        // 先把月份置为1，再加amount个月（目的是先使月份按要求正确新增之后，再单独处理日期）
        date.setDate(1); // date = 2000.1.1
        date.setMonth(date.getMonth() + amount); // date = 2000.2.1
        // 找到date加amount个月后的月份最后一天的日期
        const d2 = new Date(
          date.getFullYear(), // 2000
          date.getMonth() + 1, // 3
          0, // 日期为0表示上月最后一天
          0,
          0,
          0
        ).getDate(); // d2 = 29
        // 对比这个日期（d2）以及当前日期（d），返回小的那个
        date.setDate(Math.min(d, d2)); // date = 2000.2.29
        break;
      case "day":
        date.setDate(date.getDate() + amount);
        break;
      case "hour":
        date.setHours(date.getHours() + amount);
        break;
      case "minute":
        date.setMinutes(date.getMinutes() + amount);
        break;
      case "second":
        date.setSeconds(date.getSeconds() + amount);
        break;
      case "millisecond":
        date.setMilliseconds(date.getMilliseconds() + amount);
        break;
      default:
        throw new Error("Time.add: unknown unit");
    }
    return new Time(date);
  }
}
