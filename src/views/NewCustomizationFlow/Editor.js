// import ExampleTheme from "./themes/ExampleTheme"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import ToolbarPlugin from "./plugins/ToolbarPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { TRANSFORMERS } from "@lexical/markdown"

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import AutoLinkPlugin from "./plugins/AutoLinkPlugin"
import "./editor.scss"
import HtmlPlugin from "./SampleText"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { generateRandomString } from "../Validator"
import { Minus, X } from "react-feather"
// import { ParagraphNode } from "lexical"
// import { CustomParagraphNode } from "./nodes/CustomParagraphNode"

function Placeholder() {
  return <div className="editor-placeholder">Enter text...</div>
}

export default function Editor({ fontFamilies = "Montserrat", fontColor = "#444", htmlContent, onChange: onChangeText, showToolbar, style, editorState, elementId, openToolbar, setOpenToolbar, customElemnt }) {

  // console.log(fontFamilies, "fontFamilies")
  const editorConfig = Object.freeze({
    // The editor theme
    theme: {
      ltr: "ltr",
      rtl: "rtl",
      placeholder: "editor-placeholder",
      paragraph: "editor-paragraph",
      quote: "editor-quote",
      heading: {
        h1: "editor-heading-h1",
        h2: "editor-heading-h2",
        h3: "editor-heading-h3",
        h4: "editor-heading-h4",
        h5: "editor-heading-h5"
      },
      list: {
        nested: {
          listitem: "editor-nested-listitem"
        },
        ol: "editor-list-ol",
        ul: "editor-list-ul",
        listitem: "editor-listitem"
      },
      image: "editor-image",
      link: "editor-link",
      text: {
        bold: "editor-text-bold",
        italic: "editor-text-italic",
        overflowed: "editor-text-overflowed",
        hashtag: "editor-text-hashtag",
        underline: "editor-text-underline",
        strikethrough: "editor-text-strikethrough",
        underlineStrikethrough: "editor-text-underlineStrikethrough",
        code: "editor-text-code"
      },
      code: "editor-code",
      codeHighlight: {
        atrule: "editor-tokenAttr",
        attr: "editor-tokenAttr",
        boolean: "editor-tokenProperty",
        builtin: "editor-tokenSelector",
        cdata: "editor-tokenComment",
        char: "editor-tokenSelector",
        class: "editor-tokenFunction",
        "class-name": "editor-tokenFunction",
        comment: "editor-tokenComment",
        constant: "editor-tokenProperty",
        deleted: "editor-tokenProperty",
        doctype: "editor-tokenComment",
        entity: "editor-tokenOperator",
        function: "editor-tokenFunction",
        important: "editor-tokenVariable",
        inserted: "editor-tokenSelector",
        keyword: "editor-tokenAttr",
        namespace: "editor-tokenVariable",
        number: "editor-tokenProperty",
        operator: "editor-tokenOperator",
        prolog: "editor-tokenComment",
        property: "editor-tokenProperty",
        punctuation: "editor-tokenPunctuation",
        regex: "editor-tokenVariable",
        selector: "editor-tokenSelector",
        string: "editor-tokenSelector",
        symbol: "editor-tokenProperty",
        tag: "editor-tokenProperty",
        url: "editor-tokenOperator",
        variable: "editor-tokenVariable"
      }
    },
    // Handling of errors during update
    onError(error) {
      throw error
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
      // CustomParagraphNode,
      // {
      //   replace: ParagraphNode,
      //   with: (node) => {
      //     return new CustomParagraphNode()
      //   }
      // }
    ],
    editorState

  })

  const [toolbarReady, setToolbarReady] = useState(false)

  useEffect(() => {
    if (!toolbarReady) {
      setToolbarReady(true)
    }
    return () => {
      setToolbarReady(false)
    }
  }, [])

  const toolbarPosition = (position) => {
    if (elementId) {
      const elementDetails = document.getElementById(elementId)?.getBoundingClientRect()
      if (position === "top") {
        return (`${elementDetails?.y}px`)
      } else if (position === "left") {
        const width = elementDetails?.width / 2
        return (`${elementDetails?.x + width}px`)
      }
    }
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`editor-container editor_here position-relative ${generateRandomString()}`}>
        {toolbarReady && elementId ? createPortal(
          <div className="editor_here" style={{ position: "fixed", width: "500px", top: toolbarPosition("top"), left: toolbarPosition("left"), transform: showToolbar ? "translateY(-150%) translateX(-50%)" : "translateY(-200%) translateX(-50%)", visibility: showToolbar ? "visible" : "hidden", opacity: showToolbar ? "1" : "0", transition: "0.5s ease", zIndex: "99999999" }}>
            <div class="position-relative">
              <ToolbarPlugin customElemnt={customElemnt} fontFamilies={fontFamilies} mainFontColor={fontColor} />
              <span title="Minimize">
                <Minus size={20} onClick={() => setOpenToolbar(!openToolbar)} className="cursor-pointer" style={{position: "absolute", top: "0px", right: "0px", padding: "2.5px", color: "#ef4444"}} />
              </span>
            </div>
          </div>
          , document.getElementById('preview-section-only')
        ) : null}
        <div className="editor-inner" style={{ ...style, width: "100%", display: "block" }}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <HtmlPlugin
            onHtmlChanged={(html, ediorState) => onChangeText(html, ediorState)}
            initialHtml={htmlContent}
          />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          {/* <OnChangePlugin
            onChange={(editorState) => {
              editorState.registerUpdateListener(() => {
                // console.log(JSON.stringify(editor.getEditorState().toJSON()), "sample")
                onChangeText($generateHtmlFromNodes(editor), JSON.stringify(editor.getEditorState().toJSON()))
              })
            }}
          /> */}
        </div>
      </div>
    </LexicalComposer>
  )
}
