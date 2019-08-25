import "regenerator-runtime/runtime"
import {
  getDocLoction,
  extractBitbucketSrc,
  isConverted,
  resizeHomePageUpTo50, extractGithubSrc, resizeGitHubHomePageUpTo50, resizeGitHubHomePageBackTo100
} from "../../app-src/contentscript/data/DomRepository"
import { getDocument } from "../../app-src/contentscript/data/QuerySelector/Document"
import { render } from "../../app-src/contentscript/presentation"
import { convertToObject } from "../../app-src/contentscript/util/YmlUtils"
import { SWAG_ID } from "../../app-src/shared/constants/App"
import {EXEC_CONVERT_SWAGGER, SiteLocation} from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"
import {querySelector} from "../../app-src/contentscript/data/QuerySelector";


let docLocation : SiteLocation;

chrome.runtime.onMessage.addListener((message: ExecConvertSwaggerMessage) => {
  if (message.type === EXEC_CONVERT_SWAGGER) {
    docLocation = getDocLoction(getDocument());
    if (docLocation === SiteLocation.OTHER) {
      alert("This extension is for GitHub & Bitbucket Only !");
      console.log("No operation. Unsupported site.");
      return
    }
    else if (docLocation === SiteLocation.BITBUCKET) {
      execBitBucketSwagConvert()
    }
    else if (docLocation === SiteLocation.GITHUB) {
      execGitHubSwagConvert()
    }

  }
});


const execGitHubSwagConvert = (): void => {
  console.log("Start convert")

  if (isConverted()) {
    console.log("Going back  !!");
    gitHubResizeAndRemove();
    return
  }

  const srcCode = extractGithubSrc()
  let swaggerJson
  try {
    swaggerJson = convertToObject(srcCode)
  } catch (error) {
    alert(
        `No operation.
Could not convert.
[Cause] ${error.message}`,
    )
    return
  }

  resizeGitHubAndInject()
  render(swaggerJson || "");

  console.log("Convert completed")
};


const resizeGitHubAndInject = (): void => {
  resizeGitHubHomePageUpTo50();
  const injWrapper = getDocument().createElement("div")
  injWrapper.innerHTML = `
<script>
  var global = global || window;
</script>
<div id="${SWAG_ID}"><div>
`

  injWrapper.style.cssFloat="left";
  injWrapper.style.width="50%";

  const selector = "div.application-main > div > main > div:nth-of-type(2)";
  const elm = querySelector(selector);
  if (elm) {
    elm.appendChild(injWrapper);
    console.log("injected");
    global.Buffer = global.Buffer || require("buffer").Buffer
  }
};


const gitHubResizeAndRemove = (): void => {
  resizeGitHubHomePageBackTo100();
  const elm = querySelector(`#${SWAG_ID}`).parentElement
  if(elm){
    elm.remove();
  }
}








export async function execBitBucketSwagConvert() {

  console.log("Start convert ");

  docLocation = getDocLoction(getDocument());

  if (isConverted()) {
    console.log("Going back  !!");
    bitBucketresizeAndRemove();
    return
  }

  const srcCode = await extractBitbucketSrc();
  let swaggerJson;

  try {
    swaggerJson = convertToObject(srcCode)
  } catch (error) {
    alert(`No operation. Could not convert. [Cause] ${error.message}`,);
    return
  }

  bitBucketResizeAndInject();
  render(swaggerJson || "");
  console.log("Convert completed");
}
const bitBucketResizeAndInject = (): void => {
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

const bitBucketresizeAndRemove = (): void => {
  const elm = querySelector(`#${SWAG_ID}`).parentElement
  if(elm){
    elm.remove();
  }
}






