/* eslint-disable */
import path from "path";
import fs from "fs";
// 用于制作 SVG Sprites
import store from "svgstore";
// 用于优化 SVG 文件
import { optimize } from "svgo";

export const svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || "src/assets/icons";
  return {
    name: "svgstore",
    // 仅起到标识作用
    resolveId(id) {
      if (id === "@svgstore") {
        return "svg_bundle.js";
      }
    },
    load(id) {
      if (id === "svg_bundle.js") {
        const sprites = store(options);
        const iconsDir = path.resolve(inputFolder);
        // 遍历icons目录，将全部svg作为symbol，整合制作为一个大svg
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file);
          const svgid = path.parse(file).name;
          let code = fs.readFileSync(filepath, { encoding: "utf-8" });
          sprites.add(svgid, code);
        }
        // 优化svg雪碧图代码
        const { data: code } = optimize(
          sprites.toString({ inline: options.inline }),
          {
            plugins: [
              "cleanupAttrs",
              "removeDoctype",
              "removeComments",
              "removeTitle",
              "removeDesc",
              "removeEmptyAttrs",
              {
                name: "removeAttrs",
                params: { attrs: "(data-name|data-xxx)" },
              },
            ],
          }
        );
        return `const div = document.createElement('div')
div.innerHTML = \`${code}\`
const svg = div.getElementsByTagName('svg')[0]
// 将大svg隐藏
if (svg) {
  svg.style.position = 'absolute'
  svg.style.width = 0
  svg.style.height = 0
  svg.style.overflow = 'hidden'
  svg.setAttribute("aria-hidden", "true")
}
// listen dom ready event
// 将大svg作为根节点第一个元素
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.firstChild) {
    document.body.insertBefore(div, document.body.firstChild)
  } else {
    document.body.appendChild(div)
  }
})`;
      }
    },
  };
};
