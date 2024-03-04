import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  FORMAT_ELEMENT_COMMAND,
  DEPRECATED_$isGridSelection
} from "lexical"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $wrapNodes, $isAtNodeEnd, $patchStyleText, $getSelectionStyleValueForProperty } from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list"
import { createPortal } from "react-dom"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from "@lexical/rich-text"
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code"
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledButtonDropdown } from "reactstrap"
import { SketchPicker } from "react-color"
// import CustomColorModifier from "../../FormBuilder/FormBuilder(components)/CustomColorModifier"
// import { Dropdown, DropdownItem } from "reactstrap"

const LowPriority = 1

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol"
])

const FONT_FAMILY_OPTIONS = [
  { label: "Abril Fatface", value: `Abril Fatface` },
  { label: "Acme", value: `Acme` },
  { label: "Caveat", value: `Caveat` },
  { label: "Dancing Script", value: `Dancing Script` },
  { label: "Kalam", value: `Kalam` },
  { label: "Lato", value: `Lato` },
  { label: "Lexend", value: `Lexend` },
  { label: "Lilita One", value: `Lilita One` },
  { label: "Montserrat", value: `Montserrat` },
  { label: "Noto Sans", value: `Noto Sans` },
  { label: "Open Sans", value: `Open Sans` },
  { label: "Oswald", value: `Oswald` },
  { label: "Pacifico", value: `Pacifico` },
  { label: "Play", value: `Play` },
  { label: "Roboto", value: `Roboto` },
  { label: "Satisfy", value: `Satisfy` },
  { label: "sans-serif", value: `sans-serif` },
  { label: "Ubuntu", value: `Ubuntu` }
]

const FONT_SIZE_OPTIONS = []

for (let index = 0; index < 200; index++) {
  FONT_SIZE_OPTIONS.push({value: `${index + 1}px`, label: `${index + 1}px`})
  
}

const LINE_HEIGHT_OPTIONS = [
  { label: '0.25', value: '0.25' },
  { label: '0.5', value: '0.5' },
  { label: '0.75', value: '0.75' },
  { label: '1', value: '1' },
  { label: '1.25', value: '1.25' },
  { label: '1.5', value: '1.5' },
  { label: '17.5', value: '1.75' },
  { label: '2', value: '2' },
  { label: '2.25', value: '2.25' },
  { label: '2.5', value: '2.5' },
  { label: '27.5', value: '2.75' }
]

const FONT_WEIGHT_OPTIONS = [
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '400', value: '400' },
  { label: '500', value: '500' },
  { label: '600', value: '600' },
  { label: '700', value: '700' },
  { label: '800', value: '800' },
  { label: '900', value: '900' }
]

function dropDownActiveClass(active) {
  if (active) return 'active dropdown-item-active'
  else return ''
}

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List"
}

function Divider() {
  return <div className="" />
}


function getSelectedNode(selection) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = "0"
    editor.style.top = "-1000px"
    // editor.style.left = "-1000px"
  } else {
    editor.style.opacity = "1"
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
    // editor.style.left = `${rect.left + window.pageXOffset - (editor.offsetWidth / 2) + (rect.width / 2)}px`
    editor.style.right = `20px`
  }
}

function FloatingLinkEditor({ editor, topPosition, widthPosition }) {
  const editorRef = useRef(null)
  const inputRef = useRef(null)
  const mouseDownRef = useRef(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [isEditMode, setEditMode] = useState(false)
  const [lastSelection, setLastSelection] = useState(null)

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl("")
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild !== null) {
          inner = inner.firstElementChild
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect)
      }
      setLastSelection(selection)
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null)
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl("")
    }

    return true
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        LowPriority
      )
    )
  }, [editor, updateLinkEditor])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <div className="editor_here position-fixed " style={{ width: `${widthPosition}%`, zIndex: "99999999", top: `${parseInt(topPosition)}px` }}>
      <div ref={editorRef} className="link-editor">
        {isEditMode ? (
          <input
            ref={inputRef}
            className="link-input"
            value={linkUrl}
            onChange={(event) => {
              setLinkUrl(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                if (lastSelection !== null) {
                  if (linkUrl !== "") {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                  }
                  setEditMode(false)
                }
              } else if (event.key === "Escape") {
                event.preventDefault()
                setEditMode(false)
              }
            }}
          />
        ) : (
          <>
            <div className="link-input">
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
              <div
                className="link-edit"
                role="button"
                tabIndex={0}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setEditMode(true)
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Select({ onChange, className, options, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef
  // setShowBlockOptionsDropDown
}) {
  const dropDownRef = useRef(null)

  useEffect(() => {
    const toolbar = toolbarRef.current
    const dropDown = dropDownRef.current

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${left}px`
    }
  }, [dropDownRef, toolbarRef])

  // useEffect(() => {
  //   const dropDown = dropDownRef.current
  //   const toolbar = toolbarRef.current

  //   if (dropDown !== null && toolbar !== null) {
  //     // const handle = (event) => {
  //       // const {target} = event

  //       // if (!dropDown.contains(target) && !toolbar.contains(target)) {
  //       //   setShowBlockOptionsDropDown(false)
  //       // }
  //     // }
  //     document.addEventListener("click", handle)

  //     return () => {
  //       document.removeEventListener("click", handle)
  //     }
  //   }
  // }, [dropDownRef, toolbarRef])

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"))
        }
      })
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"))
        }
      })
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
    // setShowBlockOptionsDropDown(false)
  }

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode())
        }
      })
    }
    // setShowBlockOptionsDropDown(false)
  }

  return (
    <div className="editor_here dropdown">
      {/* <div className="dropdown" ref={dropDownRef}> */}
      <DropdownItem tag={'button'} className={`item`} onClick={formatParagraph}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatLargeHeading}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatSmallHeading}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </DropdownItem>
      <DropdownItem tag={'button'} className={`item`} onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </DropdownItem>
      {/* <button className="item" onClick={formatParagraph}>
          <span className="icon paragraph" />
          <span className="text">Normal</span>
          {blockType === "paragraph" && <span className="active" />}
        </button> */}
      {/* <button className="item" onClick={formatLargeHeading}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </button> */}
      {/* <button className="item" onClick={formatSmallHeading}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </button> */}
      {/* <button className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button> */}
      {/* <button className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button> */}
      {/* <button className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button> */}
      {/* <button className="item" onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button> */}
      {/* </div> */}
    </div>
  )
}

function FontDropDown({
  editor,
  value,
  style
}) {


  const handleClick = useCallback(
    (option) => {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          // toChange(option)
          $patchStyleText(selection, {
            [style]: option
          })
          // toChange(false)
        }
      })
    },
    [editor, style]
  )

  const buttonAriaLabel = style === 'font-family' ? 'Formatting options for font family' : 'Formatting options for font size'

  return (
    <div className="editor_here">
      <div
        id={`${style}-id`}
        className="dropdown"
        buttonClassName={`toolbar-item ${style}`}
        buttonLabel={value}
        buttonIconClassName={
          style === 'font-family' ? 'icon block-type font-family' : ''
        }
        buttonAriaLabel={buttonAriaLabel}
        style={{ position: 'fixed', right: "10px", height: "auto", overflowY: "scroll", maxHeight: "200px" }}
      >
        {(style === 'font-family' ? FONT_FAMILY_OPTIONS : style === "line-height" ? LINE_HEIGHT_OPTIONS : style === "font-weight" ? FONT_WEIGHT_OPTIONS : FONT_SIZE_OPTIONS).map(
          (option, key) => (
            <DropdownItem tag={'button'} className={`item ${dropDownActiveClass(value === option?.value)} ${style === 'font-size' ? 'fontsize-item' : ''}`} onClick={() => handleClick(option?.value)} key={key}>
              <span className="text">{option?.label}</span>
            </DropdownItem>
            // <button
            //   className={`item ${dropDownActiveClass(value === option)} ${style === 'font-size' ? 'fontsize-item' : ''
            //     }`}
            //   onClick={() => handleClick(option)}
            //   key={option}>
            //   <span className="text">{text}</span>
            // </button>
          )
        )}
      </div>

    </div>
  )
}

const QuillColorModifier = ({ editor, styles, setStyles, type }) => {
  const getBgColor = (colorIsThe) => {
    if (colorIsThe) {
      if (colorIsThe.includes("rgb")) {
        const arr = colorIsThe.split("rgba")[1].slice(1, -1).split(",")
        return { r: arr[0], g: arr[1], b: arr[2], a: arr[3] }
      } else if (colorIsThe.includes("hsl")) {
        const arr = colorIsThe.split("hsl")[1].slice(1, -1).split(",")
        return { h: arr[0], s: arr[1], l: arr[2] }
      } else {
        return colorIsThe
      }
    }
  }

  return (
    <div className="position-relative" style={{ maxWidth: "100%", zIndex: "999999999999999999999999999999999999999999999999999" }} onClick={e => e.stopPropagation()} onDrag={e => e.stopPropagation()} onDragStart={e => e.stopPropagation()}>
      <style>{`
              .active-on::before {
                  content: "";
                  position: absolute;
                  inset: 0px;
                  z-index: -1;
                  border-bottom: 5px solid #7367f0;
              }
              .toolbar .sketch-picker {
                  width: auto !important;
                  padding: 0px !important;
                  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px !important;
              }
              // .toolbar .sketch-picker > div:first-child, .sketch-picker > div:nth-child(2) {
              //   display: none !important;
              // }
              #colorPickDropdown, #backgroundColorPickDropdown {
                background-color: white !important;
                padding: 0px !important;
                border: none !important;
              }
          `}</style>
      <div className="position-relative d-flex justify-content-center align-items-center">
        {
          styles?.backgroundImage ? (
            <div className="position-absolute w-100 h-100" style={{ zIndex: "-1", scale: "0.8", filter: "blur(40px)", ...styles, backgroundImage: styles?.backgroundImage }}></div>
          ) : ''
        }
        <Card className='m-0' onDrag={e => e.stopPropagation()} onDragStart={e => e.stopPropagation()}>
          <CardBody className='p-0' onDrag={e => e.stopPropagation()} onDragStart={e => e.stopPropagation()}>
            <div onDrag={e => e.stopPropagation()} onDragStart={e => e.stopPropagation()} style={{ padding: "0.75rem" }}>
              <SketchPicker color={getBgColor(styles)} onChange={(e) => {
                const { r, g, b, a } = e.rgb
                const value = `rgba(${r},${g},${b},${a})`
                setStyles(value)
                console.log("haha1212", 1, value, type)
                editor.update(() => {
                  console.log("haha1212", 2, value, type)
                  const selection = $getSelection()
                  console.log({selection})
                  if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
                    console.log("haha1212", 3, value, type)
                    $patchStyleText(selection, { [type]: value })
                  }
                })
              }} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default function ToolbarPlugin({ fontFamilies = "Montserrat", mainFontColor = "#444", topPosition, elementId, widthPosition, customElemnt }) {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef(null)
  const [blockType, setBlockType] = useState("paragraph")
  const [selectedElementKey, setSelectedElementKey] = useState(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  // const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false)
  // const [showFontFamily, setShowFontFamily] = useState(false)
  // const [showFontSize, setShowFontSize] = useState(false)
  // const [showLineHeight, setShowLineHeight] = useState(false)
  const [fontColor, setFontColor] = useState(false)
  const [fontColorValue, setFontColorValue] = useState(mainFontColor)
  const [fontBackgroundColor, setFontBackgroundColor] = useState(false)
  const [fontBackgroundColorValue, setFontBackgroundColorValue] = useState("#fff")
  const [codeLanguage, setCodeLanguage] = useState("")
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  // const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [fontFamily, setFontFamily] = useState(fontFamilies)
  const [fontSize, setFontSize] = useState('15px')
  const [lineHeight, setLineHeight] = useState('1')
  const [fontWeight, setFontWeight] = useState('300')
  // const [isStrikethrough, setIsStrikethrough] = useState(false)
  // const [isCode, setIsCode] = useState(false)
  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      // setIsStrikethrough(selection.hasFormat("strikethrough"))
      // setIsCode(selection.hasFormat("code"))

      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', fontFamilies)
      )
      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px')
      )

      setLineHeight(
        $getSelectionStyleValueForProperty(selection, 'line-height', '1')
      )

      setFontWeight(
        $getSelectionStyleValueForProperty(selection, 'font-weight', '300')
      )

      setFontColorValue(
        $getSelectionStyleValueForProperty(selection, 'color', mainFontColor)
      )

      setFontBackgroundColorValue(
        $getSelectionStyleValueForProperty(selection, 'background-color', '#fff')
      )
      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar()
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        LowPriority
      )
    )
  }, [editor, updateToolbar])

  // const onFontColorSelect = (color) => {

  // }

  // useEffect(() => {
  //   onFontColorSelect({color: fontColorValue})
  // }, [fontColorValue])

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey]
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <div className="toolbar" ref={toolbarRef} onDrag={e => e.stopPropagation()} onDragStart={e => e.stopPropagation()}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND)
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND)
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <UncontrolledButtonDropdown>
            <DropdownToggle tag="button" className="toolbar-item block-controls">
              <span className={`icon block-type ${blockType}`} />
              <span className="text">{blockTypeToBlockName[blockType]}</span>
              <i className="chevron-down" />
            </DropdownToggle>
            <DropdownMenu className='table-menu'>
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
              // setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          {/* <button
            className="toolbar-item block-controls"
            onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
            aria-label="Formatting Options"
          >
            <span className={`icon block-type ${blockType}`} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )} */}
          <Divider />
        </>
      )}

      {/* <div id="font-family">
        <button
          className="toolbar-item block-controls"
          onClick={() => {
            setShowFontFamily(!showFontFamily)

          }}
          aria-label="Formatting Options"
        >
          <span className={`icon block-type font-family`} />
          <span className="text">{fontFamily}</span>
          <i className="chevron-down" />
        </button>
        {showFontFamily &&
          createPortal(
            <FontDropDown
              style={'font-family'}
              value={fontFamily}
              editor={editor}
              toChange={setShowFontFamily}
            />,
            document.body
          )}
      </div> */}

      <UncontrolledButtonDropdown>
        <DropdownToggle tag="button" className="toolbar-item block-controls">
          <span className={`icon block-type font-family`} />
          <span className="text">{fontFamily}</span>
          <i className="chevron-down" />
        </DropdownToggle>
        <DropdownMenu className='table-menu'>
          <FontDropDown
            style={'font-family'}
            value={fontFamily}
            editor={editor}
          />
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      <UncontrolledButtonDropdown>
        <DropdownToggle tag="button" className="toolbar-item block-controls">
          <span className="text" style={{ width: '40px' }}>{fontSize}</span>
          <i className="chevron-down" />
        </DropdownToggle>
        <DropdownMenu className='table-menu'>
          <FontDropDown
            style={'font-size'}
            value={fontSize}
            editor={editor}
          />
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      {/* <div id="font-size" className="position-relative">
        <button
          className="toolbar-item block-controls"
          onClick={() => setShowFontSize(!showFontSize)}
          aria-label="Formatting Options"
        >
          <span className="text" style={{ width: '40px' }}>{fontSize}</span>
          <i className="chevron-down" />
        </button>

        {showFontSize &&
          createPortal(
            <FontDropDown
              style={'font-size'}
              value={fontSize}
              editor={editor}
              toChange={setShowFontSize}
            />,
            document.body
          )}

      </div> */}


      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            className={`toolbar-item spaced d-none ${isBold ? "active" : ""}`}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            className={`toolbar-item spaced ${isItalic ? "active" : ""}`}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            className={`toolbar-item spaced ${isUnderline ? "active" : ""}`}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </button>
          <button
            onClick={insertLink}
            className={`toolbar-item spaced ${isLink ? "active" : ""}`}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </button>
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} topPosition={topPosition} widthPosition={widthPosition} />
              , document.getElementById(elementId))}
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
            }}
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
            }}
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
            }}
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </button>
          <UncontrolledButtonDropdown>
            <DropdownItem>
              <DropdownToggle
                id="colorPickDropdown"
                onClick={() => {
                  setFontColor(!fontColor)
                }}
              >
                <button
                  className="toolbar-item block-controls"
                // aria-label="Formatting Options"
                >
                  <i className="format font-color" />
                  <i className="chevron-down" />
                </button>
                <DropdownMenu>
                  <div style={{ width: "275px", position: "relative" }} id="quillColorPick"><QuillColorModifier editor={editor} styles={fontColorValue} setStyles={setFontColorValue} type="color" /></div>
                </DropdownMenu>
              </DropdownToggle>
            </DropdownItem>
          </UncontrolledButtonDropdown>
          {/* {fontColor &&
            createPortal(
              <div style={{ width: "275px", position: "fixed", right: "10px" }} id="quillColorPick"><QuillColorModifier editor={editor} styles={fontColorValue} setStyles={setFontColorValue} type="color" /></div>,
              document.body
            )} */}

          <UncontrolledButtonDropdown>
            <DropdownItem>
              <DropdownToggle
                id="backgroundColorPickDropdown"
                onClick={() => {
                  setFontBackgroundColor(!fontBackgroundColor)
                }}
              >
                <button
                  className="toolbar-item block-controls"
                // aria-label="Formatting Options"
                >
                  <i className="format bg-color" />
                  <i className="chevron-down" />
                </button>
                <DropdownMenu>
                  <div style={{ width: "275px", position: "relative" }} id="quillBackgroundColorPick"><QuillColorModifier editor={editor} styles={fontBackgroundColorValue} setStyles={setFontBackgroundColorValue} type="background-color" /></div>
                </DropdownMenu>
              </DropdownToggle>
            </DropdownItem>
          </UncontrolledButtonDropdown>
          {/* <button
            id="backgroundColorPickDropdown"
            className="toolbar-item block-controls"
            aria-label="Formatting Options"
            onClick={() => {
              setFontBackgroundColor(!fontBackgroundColor)
            }}
          >
            <i className="format bg-color" />
            <i className="chevron-down" />
          </button> */}
          {/* {fontBackgroundColor &&
            createPortal(
              <div style={{ width: "275px", position: "fixed", right: "10px" }} id="quillBackgroundColorPick"><QuillColorModifier editor={editor} styles={fontBackgroundColorValue} setStyles={setFontBackgroundColorValue} type="background-color" /></div>,
              document.body
            )} */}

          <UncontrolledButtonDropdown>
            <DropdownToggle tag="button" className="toolbar-item block-controls">
              <span className={`icon block-type line-height`} />
              <span className="text" style={{ width: '40px' }}>{lineHeight}</span>
              <i className="chevron-down" />
            </DropdownToggle>
            <DropdownMenu className='table-menu'>
              <FontDropDown
                style={'line-height'}
                value={lineHeight}
                editor={editor}
              />
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <UncontrolledButtonDropdown>
            <DropdownToggle tag="button" className="toolbar-item block-controls">
              <span className={`icon block-type bold`} />
              <span className="text" style={{ width: '40px' }}>{fontWeight}</span>
              <i className="chevron-down" />
            </DropdownToggle>
            <DropdownMenu className='table-menu'>
              <FontDropDown
                style={'font-weight'}
                value={fontWeight}
                editor={editor}
              />
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          {customElemnt ? customElemnt : <></>}

          {/* <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
            }}
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </button> */}
        </>
      )}
      {/* <Modal toggle={() => setFontColor(!fontColor)} className='hide-backdrop' isOpen={fontColor} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>

        
      </Modal> */}
    </div>
  )
}
