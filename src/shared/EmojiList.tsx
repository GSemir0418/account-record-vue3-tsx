import { defineComponent, PropType, ref } from "vue";
import { emojiList } from "./emojiList";
import s from "./EmojiList.module.scss";
export const EmojiList = defineComponent({
  // 在props中定义一个v-model属性，用于接收父组件绑定的值
  props: {
    modelValue: {
      type: String,
    },
    // 目前支持两种方式更新emoji，分别是props和emit
    onUpdateModelValue: {
      type: Function as PropType<(emoji: string) => void>,
    },
  },
  emits:["update:modelValue"],
  setup(props, context) {
    // 选中emoji系列的索引
    const refSelected = ref(1);
    const table: [string, string[]][] = [
      [
        "表情",
        [
          "face-smiling",
          "face-affection",
          "face-tongue",
          "face-hand",
          "face-neutral-skeptical",
          "face-sleepy",
          "face-unwell",
          "face-hat",
          "face-glasses",
          "face-concerned",
          "face-negative",
          "face-costume",
        ],
      ],
      [
        "手势",
        [
          "hand-fingers-open",
          "hand-fingers-partial",
          "hand-single-finger",
          "hand-fingers-closed",
          "hands",
          "hand-prop",
          "body-parts",
        ],
      ],
      [
        "人物",
        [
          "person",
          "person-gesture",
          "person-role",
          "person-fantasy",
          "person-activity",
          "person-sport",
          "person-resting",
        ],
      ],
      ["衣服", ["clothing"]],
      [
        "动物",
        [
          "cat-face",
          "monkey-face",
          "animal-mammal",
          "animal-bird",
          "animal-amphibian",
          "animal-reptile",
          "animal-marine",
          "animal-bug",
        ],
      ],
      ["植物", ["plant-flower", "plant-other"]],
      ["自然", ["sky & weather", "science"]],
      [
        "食物",
        [
          "food-fruit",
          "food-vegetable",
          "food-prepared",
          "food-asian",
          "food-marine",
          "food-sweet",
        ],
      ],
      ["运动", ["sport", "game"]],
    ];
    const onSeriesClick = (index: number) => {
      refSelected.value = index;
    };
    const onEmojiClick = (emoji: string) => {
      // 判断是通过emit还是props更新emoji值
      if (props.onUpdateModelValue) {
        props.onUpdateModelValue(emoji);
      } else {
        context.emit("update:modelValue", emoji);
      }
    };
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((item, index) => (
            <span
              onClick={() => {
                onSeriesClick(index);
              }}
              class={index === refSelected.value ? s.selected : ""}
            >
              {item[0]}
            </span>
          ))}
        </nav>
        <ol>
          {table[refSelected.value][1].map((category) =>
            emojiList
              .find((item) => item[0] === category)?.[1]
              .map((item) => (
                <li
                  onClick={() => {
                    onEmojiClick(item);
                  }}
                  class={item === props.modelValue ? s.selectedEmoji : ""}
                >
                  {item}
                </li>
              ))
          )}
        </ol>
      </div>
    );
  },
});
