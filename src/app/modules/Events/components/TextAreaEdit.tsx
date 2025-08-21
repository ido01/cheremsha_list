import { Box } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

interface TextAreaEditProps {
    value: string
    onChange: (e: string) => void
}

export const TextAreaEdit: React.FC<TextAreaEditProps> = ({ value, onChange }) => {
    const handleEditorChange = (content: string) => {
        onChange(content)
    }

    return (
        <Box width="100%">
            <Editor
                apiKey="mlk7jwikqcr7oxuekvammh9ffgf1icb8dd901rtfjben3n2w"
                initialValue={value}
                init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen textcolor ',
                        'insertdatetime media table paste code help wordcount',
                        'lists',
                    ],
                    toolbar:
                        'numlist bullist | bold italic | alignleft aligncenter alignright alignjustify link | link',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={handleEditorChange}
            />
        </Box>
    )
}
