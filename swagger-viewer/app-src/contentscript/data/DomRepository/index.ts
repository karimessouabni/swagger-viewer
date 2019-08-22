import { SWAG_ID } from "../../../shared/constants/App"
import { querySelector, querySelectorAll } from "../QuerySelector"
import axios from 'axios';


const GITHUB = /^.*github.*/;
const BITBUCKET = /^.*bitbucket.*/;

export const isAcceptableLocation = (documentInstance: Document): boolean => {
  console.log(BITBUCKET.test(documentInstance.location.href));
  return BITBUCKET.test(documentInstance.location.href);
};

export const isConverted = (): boolean => {
  return querySelector(`#${SWAG_ID}`) != null
};

export async function asyncGetElmOfSrcCode()  {

  return  await getElmOfSrcCode().catch((err) => console.log(err));
}

export const getElmOfSrcCode = () => {
  const selector = "div#root > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div> div > div> div:nth-of-type(1) > div > div:nth-of-type(4) > a";
  let element =  querySelector(selector);
  if(element)
  element = element.href.replace("full-commit", "raw");
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
  const selector = "div#root > div > div > div:nth-of-type(2) > div > div";
  let element =  querySelector(selector);
  if(element){

    element.style.cssFloat="left";
    element.style.width="50%";

  }else {
    throw new Error("Cannot resize home page !")
  }
};

export const resizeHomePageUpTo100 = (): void => {
  const selector = "div#root > div > div > div:nth-of-type(2) > div > div";
  let element =  querySelector(selector);
  if(element){
    element.style.width='100%';
    // TODO : remove the swagger div
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
