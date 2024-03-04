// import { useEffect } from "react"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $generateHtmlFromNodes } from "@lexical/html"
// import { $insertNodes } from "lexical"
// interface Props {
//     initialHtml?: string
//     onHtmlChanged: (html: string) => void
// }

const HtmlPlugin = ({ onHtmlChanged }) => {

    const [editor] = useLexicalComposerContext()

    // const [isFirstRender, setIsFirstRender] = useState(true)

    // useEffect(() => {
        // if (!isFirstRender) return

        // setIsFirstRender(false)
    //     editor.update(() => {
    //         const newEditor = editor.parseEditorState(editorState)

    //         editor.setEditorState(newEditor)
    //     })
    // }, [isFirstRender])

    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    // console.log(JSON.stringify(editor.getEditorState().toJSON()), "sample")
                    onHtmlChanged($generateHtmlFromNodes(editor), JSON.stringify(editor.getEditorState().toJSON()))
                })
            }}
        />
    )
}

export default HtmlPlugin