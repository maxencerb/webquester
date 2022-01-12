import { Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import PanelLayout from './utils/PanelLayout'

export default function ResponsePlaceholder() {
    return (
        <PanelLayout>
            <Stack
                spacing={4}
                direction='column'
            >
                <Heading
                    as='h4'
                    fontSize='lg'
                >Welcome to the open source client</Heading>
                <Text>This client was created as a recreationnal project, is free to use and open-source</Text>
                <Text>In order to go beyond the cors policy, the request are passed to a server and then served backed to the client.</Text>
                <Text>The server is hosted by Vercel.</Text>
                <Text>In order to have a better experience, you can store your requests and reuse them or modify them as you wish. They are stored in the local storage of your browser, thus limited by the browser itself. On Google Chrome, it is limited to 10MB so there is plenty of space. With incognito browsing or by clearing your cache, you will loose all your data.</Text>
            </Stack>
        </PanelLayout>
    )
}
