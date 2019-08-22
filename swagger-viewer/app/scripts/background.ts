import { EXEC_CONVERT_SWAGGER } from "../../app-src/shared/constants/SendMessageTypes"
import { ExecConvertSwaggerMessage } from "../../app-src/shared/types/SendMessage"

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error(`Unexpected tab.id:${tab.id}`)
  }

  console.log("in background.js file ");
  chrome.tabs.sendMessage(tab.id, ({
    type: EXEC_CONVERT_SWAGGER,
  } as any) as ExecConvertSwaggerMessage)
})
