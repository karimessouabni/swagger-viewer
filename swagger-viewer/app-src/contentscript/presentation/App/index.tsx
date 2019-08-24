import * as React from "react"
import styled from "styled-components"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { MaybeSwaggerJson } from "../../../shared/types/Swagger"
import { range } from "../../../shared/utils/ArrayUtils"
import { sleep } from "../../../shared/utils/SystemUtils"
import {
  getElmOfSwaggerEndPointDefHeaders,
  getElmOfSwaggerSchemasModelHeaders,
} from "../../data/DomRepository"
import { Button } from "../Button"

type Props = {
  swaggerJson: MaybeSwaggerJson | string
}

export const App: React.FC<Props> = ({ swaggerJson }) => {
  return (
    <>
      <Header>
        <Button onClick={onClickExpandAll}>Expand All</Button>
        <Button onClick={onClickCollapseAll}>Close All</Button>
      </Header>
      <SwaggerUIWrapper>
        <SwaggerUI spec={swaggerJson} />
      </SwaggerUIWrapper>
      <Footer>
        <Button onClick={onClickExpandAll}>Expand All</Button>
        <Button onClick={onClickCollapseAll}>Collapse All</Button>
      </Footer>
    </>
  )
}

const onClickExpandAll = async () => {
  const isOpend = false;
  getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())


  for (const _ of range(0, 10)) {
    const targets = getElmOfSwaggerSchemasModelHeaders(isOpend)
    if (targets.length === 0) {
      break
    }
    targets.forEach((e) => e.click())

    await sleep(300)
  }
}

const onClickCollapseAll = () => {
  const isOpend = true;

  getElmOfSwaggerEndPointDefHeaders(isOpend).forEach((e) => e.click())
  getElmOfSwaggerSchemasModelHeaders(isOpend).forEach((e) => e.click())
};

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 0 0;

  & > button {
    margin-left: 3px;
    line-height: 1;
    display: inline;
    color: #49cc90;
    border-color: #49cc90;
    background-color: transparent;
        padding-right: 20px;
    margin-right: 10px;
transition: all .3s; border: 2px solid gray; border-radius: 4px; background: transparent;font-size: 14px; font-weight: 700; padding: 5px 23px;box-shadow: 0 1px 2px rgba(0,0,0,.1); font-family: sans-serif;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5px 5px 0;

  & > button {
    margin-left: 3px;
    line-height: 1;
    display: inline;
    color: #49cc90;
    border-color: #49cc90;
    background-color: transparent;
        padding-right: 20px;
    margin-right: 10px;
transition: all .3s; border: 2px solid gray; border-radius: 4px; background: transparent;font-size: 14px; font-weight: 700; padding: 5px 23px;box-shadow: 0 1px 2px rgba(0,0,0,.1); font-family: sans-serif;
  }
`;


const SwaggerUIWrapper = styled.div`
  & > .swagger-ui .information-container.wrapper .info {
    margin: 0 !important;
  }
`;
