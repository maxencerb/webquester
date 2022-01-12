import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function PanelLayout({ children }: Props) {
    return (
        <Box 
            p='4'
            maxWidth='100vw'
            minWidth={['100vw', '100vw', '100vw', '400px']}
            width='49vw'    
        >
            {children}
        </Box>
    )
}
