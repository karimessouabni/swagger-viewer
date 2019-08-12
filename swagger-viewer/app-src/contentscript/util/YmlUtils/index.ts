import jsYaml from "js-yaml"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"

/**
 * @param str yml string | json string
 */
export const convertToObject = (str: string): MaybeSwaggerJson | null => {
  if (str == null) {
    return null
  }

  console.log("calling an external library");

  const maybe = jsYaml.load(str);  // calling an external library
  console.log(maybe);
  if (maybe == null) {
    return null
  }
  if (typeof maybe === "string") {
    return null
  }
  return maybe
}
