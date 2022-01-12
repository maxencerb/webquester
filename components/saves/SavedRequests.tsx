import { AppRequestType, SaveRequestType } from '@models/request'
import React, { useEffect, useState } from 'react'
import { getSavedRequests } from '@services/localStorage'
import { Heading, Stack, Wrap, WrapItem, Text, Flex, Button } from '@chakra-ui/react'
import SavedRequest from './SavedRequest'
import { AiOutlineReload } from 'react-icons/ai'

type Props = {
    loadRequest: (request: AppRequestType) => void,
}

export default function SavedRequests({ loadRequest }: Props) {

    const [savedRequests, setSavedRequests] = useState<SaveRequestType[]>([])

    const getRequests = () => {
        const requests = getSavedRequests()
        setSavedRequests(requests)
    }

    useEffect(() => {
        const getRequestsAfterTimeout = () => {
            setTimeout(getRequests, 1000)
        }
        window && window.addEventListener('storage', getRequestsAfterTimeout)
        return () => window && window.removeEventListener('storage', getRequestsAfterTimeout)
    }, [])

    return (
        <Stack
            spacing={4}
            direction='column'
            p={4}
        >
            <Heading as='h2' textAlign='center'>
                Saved Requests
            </Heading>
            <Flex
                direction='row'
                justifyContent='flex-end'
            >
                <Button
                    onClick={() => {
                        getRequests()
                    }}
                    leftIcon={<AiOutlineReload />}
                >Reload</Button>
            </Flex>
            {
                savedRequests.length === 0 ?  <Text textAlign='center'>No saved requests</Text> :
                <Wrap>
                {savedRequests.map(request => (
                    <WrapItem
                        key={request.uid}
                    >
                        <SavedRequest
                            {...request}
                            loadRequest={loadRequest}
                        />
                    </WrapItem>
                ))}
            </Wrap>}
        </Stack>
    )
}
