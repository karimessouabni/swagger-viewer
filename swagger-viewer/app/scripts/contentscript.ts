// regenerator-runtime/runtime for async/await
import "regenerator-runtime/runtime"
import {
  asyncGetElmOfSrcCode,
  extractSrc,
  isConverted,
  resizeHomePageUpTo50,
  resizeHomePageUpTo100, getElmOfSrcCode
} from "../../app-src/contentscript/data/DomRepository"
import { getDocument } from "../../app-src/contentscript/data/QuerySelector/Document"
import { render } from "../../app-src/contentscript/presentation"
import { convertToObject } from "../../app-src/contentscript/util/YmlUtils"
import { APP_RENDER_ID } from "../../app-src/shared/constants/App"
import { EXEC_CONVERT_SWAGGER } from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"
import {querySelector} from "../../app-src/contentscript/data/QuerySelector";

/* eslint-disable no-alert */

/**
 * contentscriptのエントリーポイント
 * backgroundからイベントを受け取って実行
 */
chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
    execConvertSwagger()
  }
})


export async function execConvertSwagger() {

  console.log("Start convert ")

  if (isConverted()) {
    resizeHomePageUpTo100();
    alert("No operation. Already converted.")
    return
  }

  const srcCode = await extractSrc()
  let swaggerJson;
  try {
    swaggerJson = convertToObject(srcCode)
  } catch (error) {
    alert(
      `No operation.
Could not convert.
[Cause] ${error.message}`,
    );
    return
  }

  removeAndInject();
  render(swaggerJson || "");

  console.log("Convert completed")
}


const removeAndInject = (): void => {
  // 元srcを削除
  resizeHomePageUpTo50();


  // 元srcのところにrenderする
  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `
<script>
  var global = global || window;
</script>
<div id="${APP_RENDER_ID}"><div>
`
  injWrapper.style.gridColumn="2";

  const selector = "#wrapper";
  const elm = querySelector(selector);
  if (elm) {
    elm.appendChild(injWrapper);
    elm.style.display="grid";
    elm.style.width = "-webkit-fill-available";

    console.log("injected");

    // swagger-ui-reactの依存ライブラリのため追加
    // eslint-disable-next-line global-require
    global.Buffer = global.Buffer || require("buffer").Buffer
  }
}
