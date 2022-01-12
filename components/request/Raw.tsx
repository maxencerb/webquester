import { Textarea } from '@chakra-ui/react'
import React from 'react'

type Props = {
    displayed: boolean
    content: string
}

export default function Raw({ displayed, content }: Props) {
    return (
        <Textarea
            display={displayed ? 'block' : 'none'}
            resize='none'
            value={content}
            readOnly
            height='200px'
        />
    )
}
