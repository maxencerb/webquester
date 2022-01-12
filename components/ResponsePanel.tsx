import { Button, Flex, Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { AppResponse } from '@models/request'
import { httpStatus } from '@services/utils/request'
import React, { useState } from 'react'
import Body from './response/Body'
import PanelLayout from './utils/PanelLayout'
import Headers from './response/Headers'

export default function ResponsePanel({ status, body, time, size, headers }: AppResponse) {
    
    const timeHelpText = time < 1000 ? 'Fast' : 
        time < 5000 ? 'Normal' :
        time < 10000 ? 'Slow' :
        'Very Slow'

    const sizeHelpText = size < 1000 ? 'Small' :
        size < 10000 ? 'Medium' :
        size < 100000 ? 'Large' :
        'Very Large'

    const timeColor = time < 1000 ? 'green' :
        time < 5000 ? 'yellow' :
        time < 10000 ? 'orange' :
        'red'

    const sizeColor = size < 1000 ? 'green' :
        size < 10000 ? 'yellow' :
        size < 100000 ? 'orange' :
        'red'
    
    const [currentWindow, setCurrentWindow] = useState<'Body' | 'Headers'>('Body')
    
    return (
        <PanelLayout>
            <Stack
                spacing={4}
                direction='column'
            >
                <Flex
                    direction='row'
                    justify='space-between'
                    align='center'
                >
                    <Stat>
                        <StatLabel>Status</StatLabel>
                        <StatNumber color={status >= 200 && status < 300 ? 'green' : 'red'}>{status}</StatNumber>
                        <StatHelpText>Status type : {httpStatus[status.toString()]}</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Time</StatLabel>
                        <StatNumber color={timeColor}>{time}ms</StatNumber>
                        <StatHelpText>{timeHelpText}</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Size</StatLabel>
                        <StatNumber color={sizeColor}>{size}</StatNumber>
                        <StatHelpText>{sizeHelpText}</StatHelpText>
                    </Stat>
                </Flex>
                <Stack
                    spacing={4}
                    direction='row'
                >
                    <Button
                        colorScheme='teal'
                        onClick={() => setCurrentWindow('Body')}
                        variant={currentWindow === 'Body' ? 'solid' : 'outline'}
                    >Body</Button>
                    <Button
                        colorScheme='teal'
                        onClick={() => setCurrentWindow('Headers')}
                        variant={currentWindow === 'Headers' ? 'solid' : 'outline'}
                    >Headers</Button>
                </Stack>
                <Body
                    displayed={currentWindow === 'Body'}
                >{body}</Body>
                <Headers
                    displayed={currentWindow === 'Headers'}
                    headers={headers}
                />
            </Stack>
        </PanelLayout>
    )
}
