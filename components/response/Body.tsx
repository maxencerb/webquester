import { Textarea } from '@chakra-ui/react'
import React from 'react'

type Props = {
    displayed: boolean,
    children: string
}

export default function Body({ displayed, children }: Props) {
    return (
        <Textarea
            display={displayed ? 'block' : 'none'}
            value={children}
            readOnly
            resize='none'
            height='160px'
        />
    )
}
