import { defineComponent, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { DatetimePicker, Popup } from "vant";
import { Time } from "../../shared/time";
import s from "./InputPad.module.scss";
export const InputPad = defineComponent({
  setup(props, context) {
    // 日期选择器功能
    const now = new Date();
    const refDate = ref<Date>(now);
    const refIsDatePickerShow = ref(false);
    const showDatePicker = () => (refIsDatePickerShow.value = true);
    const onCancel = () => (refIsDatePickerShow.value = false);
    const onConfirm = (date: Date) => {
      refDate.value = date;
      onCancel();
    };
    // 数字输入功能
    const refAmount = ref("0");
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.indexOf(".");
      // 位数限制，最大13位
      if (refAmount.value.length >= 13) {
        return;
      }
      // 位数限制，小数点后最多两位
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return;
      }
      // 如果输入的是小数点
      if (nString === ".") {
        // 如果已经存在小数点，则不能再次输入
        if (dotIndex >= 0) {
          return;
        }
        // 如果输入的是0
      } else if (nString === "0") {
        // 当第一次输入时（一开始就输入0），则不生效
        if (refAmount.value === "0") {
          return;
        }
        // 如果输入的是其他（0-9）
      } else {
        // 把默认的0删掉
        if (refAmount.value === "0") {
          refAmount.value = "";
        }
      }
      // 赋值
      refAmount.value += n.toString();
    };
    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText("1");
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText("2");
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText("3");
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText("4");
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText("5");
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText("6");
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText("7");
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText("8");
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText("9");
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText("0");
        },
      },
      {
        text: "清空",
        onClick: () => {
          refAmount.value = "0";
        },
      },
      { text: "提交", onClick: () => {} },
    ];
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon}></Icon>
            <span>
              <span onClick={showDatePicker}>
                {new Time(refDate.value).format()}
              </span>
              <Popup position="bottom" v-model:show={refIsDatePickerShow.value}>
                <DatetimePicker
                  value={refDate.value}
                  type="date"
                  title="选择年月日"
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});
