import { Textarea } from '@chakra-ui/react'
import React from 'react'

type Props = {
    displayed: boolean,
    headers: {
        [key: string]: string
    }
}

export default function Headers({ displayed, headers }: Props) {
    var text = ''
    for (const key in headers) {
        text += `${key}: ${headers[key]}\n`
    }
    return (
        <Textarea
            display={displayed ? 'block' : 'none'}
            value={text}
            readOnly
            resize='none'
            height='160px'
        />
    )
}
