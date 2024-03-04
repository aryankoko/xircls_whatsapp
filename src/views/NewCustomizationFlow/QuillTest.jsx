import React, { useEffect } from 'react'
import SunEditor from 'suneditor-react'

const QuillTest = () => {

    const SunEditorConfigBlock = {
        defaultTag: "div",
        textTags: {
            bold: "b",
            underline: "u",
            italic: "i",
            strike: "s"
        },
        mode: "balloon-always",
        toolbarContainer: "#custom_toolbar",
        katex: "window.katex",
        fontSize: [8, 10, 14, 18, 24, 36],
        customElements: () => console.log("triggered"),
        colorList: [
            ["#ff0000", "#ff5e00", "#ffe400", "#abf200"],
            ["#00d8ff", "#0055ff", "#6600ff", "#ff00dd"]
        ],
        lineHeights: [
            {
                text: "Single",
                value: 1
            },
            {
                text: "Double",
                value: 2
            }
        ],
        paragraphStyles: [
            "spaced",
            {
                name: "Box",
                class: "__se__customClass"
            }
        ],
        buttonList: [["undo", "redo", "font", "fontSize", "formatBlock", "paragraphStyle", "blockquote", "bold", "underline", "italic", "strike", "subscript", "superscript"], ["fontColor", "hiliteColor", "removeFormat", "outdent", "indent", "align", "horizontalRule", "list", "lineHeight", "table", "link", "image", "video", "audio", "math", "imageGallery", "fullScreen", "showBlocks", "codeView", "preview", "print"], ["save", "template", "customElements"]]
    }

    useEffect(() => {
        // if (editorRef.current) {
        // Initialize SunEditor with custom button
        // const editor = editorRef.current.editor

        // SunEditor.
    }, [])

    return (
        <div style={{ height: "100vh" }}>
            <SunEditor
                
                setOptions={{ ...SunEditorConfigBlock, value: "<div>wassuptest!!!</div>" }}
                onChange={(content) => {
                    console.log({ content })
                    const text = document.getElementById("text")
                    text.innerHTML = content
                }}
            />
            <span id='text'></span>
        </div>
    )
}

export default QuillTest