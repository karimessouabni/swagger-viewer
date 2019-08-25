import {SWAG_ID} from "../../../shared/constants/App"
import {querySelector, querySelectorAll} from "../QuerySelector"
import axios from 'axios';
import {SiteLocation} from "../../../shared/constants/SendMessageTypes";


const GITHUB = /^.*github.*/;
const BITBUCKET = /^.*bitbucket.*/;




export const extractGithubSrc = (): string => {
  const elm = getGithubElmOfSrcCode()

  if (!elm.textContent) {
    throw new Error("Unexpected null")
  }

  return (
      elm.textContent
          .trim()
          .split("\n")
          .filter((line) => line.trim().length !== 0)
          .map((line) => line.replace(/^ {8}/, ""))
          .join("\n")
  )
}

export const getGithubElmOfSrcCode = (): HTMLElement => {
  const selector = "div.repository-content > div.Box > div.Box-body > table"
  const element = querySelector(selector)

  if (
      element == null ||
      element.textContent == null ||
      element.textContent.length === 0
  ) {
    throw new Error(`Unexpected DOM. selector: "${selector}"`)
  }

  return element as HTMLElement
}

export const removeSrcCodeDom = (): void => {
  const elm = getGithubElmOfSrcCode()
  elm.children[0].remove()
}


/**
 *
 * BITBUCKET
 * =======================================================================================================================
 * GITHUB
 */

/**
 *
 * @param documentInstance
 * return 1 for Github 2 for Bitbucket 0 if other
 */
export const getDocLoction = (documentInstance: Document): SiteLocation => {

  if(GITHUB.test(documentInstance.location.href)){
    return SiteLocation.GITHUB;
  }
  else if(BITBUCKET.test(documentInstance.location.href)){
    return SiteLocation.BITBUCKET;
  }else {
    return SiteLocation.OTHER;
  }

};

export const isConverted = (): boolean => {
  return querySelector(`#${SWAG_ID}`) != null
};

export async function asyncGetElmOfSrcCode()  {
  return  await getBitbucketElmOfSrcCode().catch((err) => console.log(err));
}

export const getBitbucketElmOfSrcCode = () => {
  let url;
  const rawViewLink = "a.raw-link";
  const rawLink = "a.raw-view-link";
  const selector = "div#root > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div> div > div> div:nth-of-type(1) > div > div:nth-of-type(4) > a";
  const selector2 = " a>time";
  let element2;

  let rawElement1 = querySelector(rawLink);
  let rawElement2 = querySelector(rawViewLink);


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

  }else if(rawElement1){
    url = rawElement1.href;
  }
  else if(rawElement2){
    url = rawElement2.href ;
  }

  return axios.get(''+url).then(response =>response.data);
};


export async function extractBitbucketSrc() {

  const elm = await asyncGetElmOfSrcCode();

  if (!elm) {
    throw new Error("Unexpected null")
  }

  return elm;
}


export const resizeGitHubHomePageUpTo50 = (): void => {

  const footer = "div.footer";
  let footerElement =  querySelector(footer);
  const selector = "div.application-main > div > main > div:nth-of-type(2)";
  let element =  querySelector(selector);
  const selector2 = "div.repository-content";
  let element2 =  querySelector(selector2);

  if(element && element2 ){
    if(footerElement) footerElement.remove();
    element.style.cssFloat="left";
    element.style.maxWidth="none";
    element.style.width="100%";
    element2.style.cssFloat="left";
    element2.style.width="50%";
    element2.style.maxWidth="none";
  }else {
    throw new Error("Cannot resize home page !")
  }

};

export const resizeGitHubHomePageBackTo100 = (): void => {


  const selector = "div.application-main > div > main > div:nth-of-type(2)";
  let element =  querySelector(selector);
  const selector2 = "div.repository-content";
  let element2 =  querySelector(selector2);

  if(element && element2 ){
    element.style.cssFloat="left";
    element.style.maxWidth="none";
    element.style.width="100%";
    element2.style.cssFloat="none";
    element2.style.width="100%";
    element2.style.maxWidth="none";
  }else {
    throw new Error("Cannot resize home page !")
  }

};

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
