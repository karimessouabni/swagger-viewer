import { APP_RENDER_ID } from "../../../shared/constants/App"
import { querySelector, querySelectorAll } from "../QuerySelector"
import axios from 'axios';



export const isConverted = (): boolean => {
  return querySelector(`#${APP_RENDER_ID}`) != null
}

export async function asyncGetElmOfSrcCode()  {
  let response = await getElmOfSrcCode().catch((err) => {
          console.log(err);
        }
    );
console.log(response);
  return response;

}

export const getElmOfSrcCode = () => {
  //const selector = "div.repository-content > div.Box > div.Box-body > table";
  const selector = "a.raw-link";
  const element =  querySelector(selector);

  return axios.get(''+element).then(response =>response.data);

};


export async function extractSrc() {

  const elm = await asyncGetElmOfSrcCode();

  if (!elm) {
    throw new Error("Unexpected null")
  }

  return elm;
}

export const resizeHomePageUpTo50 = (): void => {
  const selector = "#content";
  let element =  querySelector(selector);
  if(element){
    element.style.width='50%';
  }else {
    throw new Error("Cannot resize home page ! ")
  }
};

export const resizeHomePageUpTo100 = (): void => {
  const selector = "#content";
  let element =  querySelector(selector);
  if(element){
    element.style.width='100%';
  }else {
    throw new Error("Cannot resize back home page ! ")
  }
};


export const getElmOfSwaggerEndPointDefHeaders = (
  isOpened: boolean,
): readonly HTMLDivElement[] => {
  if (isOpened) {
    return querySelectorAll("div.opblock.is-open > .opblock-summary") as any
  }
  return querySelectorAll("div.opblock:not(.is-open) > .opblock-summary") as any
}

/**
 * Swaggerの各Model定義の開閉アイコン部分を取得して返す
 * @param {boolean} isOpened true: 開いてる状態のヘッダーのみ取得 | false: 閉じている状態のヘッダーのみ取得
 */
export const getElmOfSwaggerSchemasModelHeaders = (
  isOpened: boolean,
): readonly HTMLDivElement[] => {
  if (isOpened) {
    return querySelectorAll(
      "span.model-box span.model-toggle:not(.collapsed)",
    ) as any
  }
  return querySelectorAll("span.model-box span.model-toggle.collapsed") as any
}
