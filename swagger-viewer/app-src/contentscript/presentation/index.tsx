import * as React from "react"
import ReactDOM from "react-dom"
import { SWAG_ID } from "../../shared/constants/App"
import { MaybeSwaggerJson } from "../../shared/types/Swagger"
import { getDocument } from "../data/QuerySelector/Document"
import { App } from "./App"

export const render = (swaggerJson: MaybeSwaggerJson | string) => {
  console.log("redering swagger");
  ReactDOM.render(
    <App swaggerJson={swaggerJson} />,
    getDocument().getElementById(SWAG_ID),
  )
};
