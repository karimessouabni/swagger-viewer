import * as DomRepository from "."
import { createMockDocumentBy } from "../../__test__/Helper"
import * as Document from "../QuerySelector/Document"
import { html as swagger20JsonHtml } from "./fixtures/GitHubPageHtml_swagger_2_0_json"
import { html as swagger30YamlHtml } from "./fixtures/GitHubPageHtml_swagger_3_0_yaml"

describe("GitHubPageHtml swagger 2.0 json tests", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as any).getDocument.mockReturnValue(
      createMockDocumentBy(
        swagger20JsonHtml,
        "https://github.com/arx-8/swagger-viewer/blob/feature/test-ex/swagger-viewer/app/scripts/shared/__test__/fixtures/swagger_2_0.json",
      ),
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    test("isAcceptableLocation", () => {
      // ## Assert ##
      expect(sut.isAcceptableLocation()).toEqual(true)
    })

    test("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toEqual(false)
    })

    test("getElmOfSrcCode", () => {
      // ## Act ##
      const result = sut.getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent).not.toEqual(null)
      expect(result.children.length).toEqual(1)
    })

    test("extractSrc", () => {
      // ## Assert ##
      expect(sut.extractSrc()).toMatchSnapshot()
    })
  })
})

describe("GitHubPageHtml swagger 3.0 yaml tests", () => {
  let sut: typeof DomRepository
  // let mockDocument: jest.MockInstance<typeof Document>
  let mockDocument: typeof Document

  beforeAll(() => {
    // ## Arrange ##
    jest.mock("../QuerySelector/Document")

    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    mockDocument = require("../QuerySelector/Document")
    // mock化しているため、mockReturnValueは必ず存在する
    // 型の書き方が不明なため、any castしている
    ;(mockDocument as any).getDocument.mockReturnValue(
      createMockDocumentBy(
        swagger30YamlHtml,
        "https://github.com/arx-8/swagger-viewer/blob/feature/test-ex/swagger-viewer/app/scripts/shared/__test__/fixtures/swagger_3_0.yaml",
      ),
    )

    // eslint-disable-next-line global-require
    sut = require(".")
  })

  describe("whole tests", () => {
    test("isAcceptableLocation", () => {
      // ## Assert ##
      expect(sut.isAcceptableLocation()).toEqual(true)
    })

    test("isConverted", () => {
      // ## Assert ##
      expect(sut.isConverted()).toEqual(false)
    })

    test("getElmOfSrcCode", () => {
      // ## Act ##
      const result = sut.getElmOfSrcCode()
      // ## Assert ##
      expect(result.textContent).not.toEqual(null)
      expect(result.children.length).toEqual(1)
    })

    test("extractSrc", () => {
      // ## Assert ##
      expect(sut.extractSrc()).toMatchSnapshot()
    })
  })
})
