import { Select, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { contentTypes } from '@services/utils/request'

type Props = {
    displayed: boolean,
    onContentChange: (content: string) => void,
    content: string,
    contentType: string,
    onContentTypeChange: (contentType: string) => void
}

export default function Content({ displayed, onContentChange, content, contentType, onContentTypeChange }: Props) {

    const textAreaPlaceholder = contentType === 'application/json' ? '{ "key": "value" }' : 
        contentType === 'application/x-www-form-urlencoded' ? 'key=value' : 
        contentType === 'multipart/form-data' ? 'key=value' :
        contentType === 'text/plain' ? 'text' :
        contentType === 'text/html' ? '<h1>Hello World</h1>' :
        contentType === 'application/xml' ? '<root><key>value</key></root>' : ''
    
    return (
        <Stack
            spacing={4}
            direction='column'
            display={displayed ? 'block' : 'none'}
        >
            <Stack
                spacing={4}
                direction='row'
                alignItems='center'
            >
                <Text as='span'>Type</Text>
                <Select
                    onChange={(e) => {
                        onContentTypeChange(e.target.value)
                    }}
                    value={contentType}
                >
                    {contentTypes.map((contentType) => {
                        return <option key={contentType} value={contentType}>{contentType}</option>
                    })}
                </Select>
            </Stack>
            <Textarea
                resize='none'
                h='150px'
                placeholder={textAreaPlaceholder}
                value={content}
                onChange={(e) => {
                    onContentChange(e.target.value)
                }}
            />
        </Stack>
    )
}
