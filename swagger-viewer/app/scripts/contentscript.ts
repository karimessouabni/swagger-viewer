// regenerator-runtime/runtime for async/await
import "regenerator-runtime/runtime"
import {
  asyncGetElmOfSrcCode,
  extractSrc,
  isConverted,
  resizeHomePageUpTo50,
  resizeHomePageUpTo100
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
  render(swaggerJson || "")

  console.log("Convert completed")
}


export async function removeAndInject() {

  resizeHomePageUpTo50();
  const selector = "#content";
  let element =  querySelector(selector);
if(element) {
  const injWrapper = element.innerHTML = element.innerHTML + `
    <script>
      var global = global || window;
    </script>
    <div id="${APP_RENDER_ID}"><div>
    `;

  const elm = await asyncGetElmOfSrcCode();


  console.log("injected" + elm);


  global.Buffer = global.Buffer || require("buffer").Buffer
  }
}
