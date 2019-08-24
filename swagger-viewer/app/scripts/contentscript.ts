import "regenerator-runtime/runtime"
import {
  isAcceptableLocation,
  extractSrc,
  isConverted,
  resizeHomePageUpTo50
} from "../../app-src/contentscript/data/DomRepository"
import { getDocument } from "../../app-src/contentscript/data/QuerySelector/Document"
import { render } from "../../app-src/contentscript/presentation"
import { convertToObject } from "../../app-src/contentscript/util/YmlUtils"
import { SWAG_ID } from "../../app-src/shared/constants/App"
import { EXEC_CONVERT_SWAGGER } from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"
import {querySelector} from "../../app-src/contentscript/data/QuerySelector";



chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
    execConvertSwagger()
  }
});


export async function execConvertSwagger() {

  console.log("Start convert ");

  if (!isAcceptableLocation(getDocument())) {
    alert("This extension is for GitHub & Bitbucket Only");
    console.log("No operation. Unsupported site.");
    return
  }

  if (isConverted()) {
    console.log("Going back  !!");
    resizeAndRemove();
    return
  }

  const srcCode = await extractSrc();
  let swaggerJson;
  try {
    swaggerJson = convertToObject(srcCode)
  } catch (error) {
    alert(`No operation. Could not convert. [Cause] ${error.message}`,);
    return
  }

  resizeAndInject();
  render(swaggerJson || "");

  console.log("Convert completed")
}


const resizeAndInject = (): void => {
  resizeHomePageUpTo50();

  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `
<script>
  var global = global || window;
</script>
<div id="${SWAG_ID}"><div>
`
  injWrapper.style.cssFloat="left";
  injWrapper.style.width="50%";

  const selector = "div#root > div > div > div:nth-of-type(2) > div > div";
  const elm = querySelector(selector);
  if (elm) {
    elm.appendChild(injWrapper);
    elm.style.width = "-webkit-fill-available";
    console.log("injected");

    global.Buffer = global.Buffer || require("buffer").Buffer
  }
}

const resizeAndRemove = (): void => {
  const elm = querySelector(`#${SWAG_ID}`).parentElement
  if(elm){
    elm.remove();
  }
}
