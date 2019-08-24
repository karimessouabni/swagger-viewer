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
  let url;
  const selector = "div#root > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div> div > div> div:nth-of-type(1) > div > div:nth-of-type(4) > a";
  const selector2 = " a>time";
  let element2;
  if(selector2) {
    element2 =  querySelector(selector2) ? querySelector(selector2).parentElement : null;
  }
  let element =  querySelector(selector);
  if(element){
    url = element.href.replace("full-commit", "raw");
  }
  else if(element2) {
    let fileName = element2.parentElement.previousElementSibling.previousElementSibling.innerText;
   if (fileName) url = element2.href.replace("commits", "raw")+'/'+fileName;

  }

  return axios.get(''+url).then(response =>response.data);
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
