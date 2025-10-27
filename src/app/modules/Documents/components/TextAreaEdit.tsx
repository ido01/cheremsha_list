import { Link, RichTextEditor } from '@mantine/tiptap'
import { Box } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface TextAreaEditProps {
    value: string
    onChange: (e: string) => void
}

export const TextAreaEdit: React.FC<TextAreaEditProps> = ({ value, onChange }) => {
    const settings = useSelector(selectSettings)

    const editor = useEditor({
        shouldRerenderOnTransaction: true,
        extensions: [
            StarterKit.configure({ link: false }),
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value,
    })

    const handleEditorChange = (content: string) => {
        onChange(content)
    }

    useEffect(() => {
        document.addEventListener('focusin', (e: FocusEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (e.target?.closest('.tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
                e.stopImmediatePropagation()
            }
        })
    }, [])

    return (
        <Box width="100%">
            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
            <Editor
                apiKey={settings.tinymce || 'xnk50yfbqv537gxly6kuu0okwlx0zxqqalzvhtkwkjqk96hp'}
                initialValue={value}
                init={{
                    height: 300,
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen textcolor ',
                    //     'insertdatetime media table paste code help wordcount',
                    //     'lists',
                    // ],
                    // toolbar:
                    //     'link code numlist bullist | bold italic | alignleft aligncenter alignright alignjustify | link code',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                plugins="code link lists"
                toolbar="numlist bullist | bold italic | alignleft aligncenter alignright alignjustify | link code"
                onEditorChange={handleEditorChange}
            />
        </Box>
    )
}
