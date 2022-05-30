import { defineComponent, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { DatetimePicker, Popup } from "vant";
import { time } from "../../shared/time";
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

    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "提交", onClick: () => {} },
    ];
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon}></Icon>
            <span>
              <span onClick={showDatePicker}>
                {time(refDate.value).format()}
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
          <span class={s.amount}>199.00</span>
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
