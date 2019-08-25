import jsYaml from "js-yaml"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"

export const convertToObject = (response: string): MaybeSwaggerJson | null => {
  if (response == null) {
    return null
  }

  console.log("calling an external library");

  // if the reponse is a json it will be already converted
  const maybe = (response.swagger) ? response: jsYaml.load(response) ;  // calling an external library
  console.log(maybe);
  if (maybe == null) {
    return null
  }

  if (typeof maybe === "string") {
    return null
  }
  return maybe
};
