import { AppRequestType, SaveRequestType } from '@models/request'
import React, { useEffect, useState } from 'react'
import { deleteAllRequests, getSavedRequests } from '@services/localStorage'
import { Heading, Stack, Wrap, WrapItem, Text, Flex, Button, useToast, IconButton } from '@chakra-ui/react'
import SavedRequest from './SavedRequest'
import { AiOutlineReload, AiOutlineDelete } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'

type Props = {
    loadRequest: (request: AppRequestType) => void,
}

export default function SavedRequests({ loadRequest }: Props) {

    const toast = useToast()

    const [savedRequests, setSavedRequests] = useState<SaveRequestType[]>([])

    const getRequests = () => {
        const requests = getSavedRequests()
        setSavedRequests(requests)
    }

    useEffect(() => {
        const getRequestsAfterTimeout = () => {
            setTimeout(getRequests, 1000)
        }
        // Load requests after 1 second when storage state changes
        window && window.addEventListener('storage', getRequestsAfterTimeout)
        // Load requests on mount
        getRequests()
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
            <Text textAlign='center'>
                Click on a request 
                <IconButton
                    icon={<BsPencil />}
                    aria-label='Edit demo'
                    variant='ghost'
                    size='sm'
                    ml={2}
                    mr={2}
                    // display='inline'
                    colorScheme='blue'
                />
                icon to load it and press on the
                <Button
                    leftIcon={<AiOutlineReload />}
                    size='sm'
                    ml={2}
                    mr={2}
                >Reload</Button>
                button if they do not appear
            </Text>
            <Flex
                direction='row'
                justifyContent='flex-end'
            >
                <Stack
                    spacing={4}
                    direction='row'
                >
                    <Button
                        variant='outline'
                        colorScheme='red'
                        onClick={() => {
                            const done = deleteAllRequests();
                            if (done) {
                                setSavedRequests([])
                                toast({
                                    title: 'All requests deleted',
                                    description: 'All requests have been deleted',
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'bottom-left',
                                })
                            } else {
                                toast({
                                    title: 'Error',
                                    description: 'There was an error deleting all requests',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'bottom-left',
                                })
                            }
                        }}
                        rightIcon={<AiOutlineDelete />}
                    >Delete All</Button>
                    <Button
                        onClick={() => {
                            getRequests()
                        }}
                        leftIcon={<AiOutlineReload />}
                    >Reload</Button>
                </Stack>
            </Flex>
            {
                savedRequests.length === 0 ?  <Text textAlign='center'>No saved requests</Text> :
                <Wrap
                    spacing={4}
                    direction={['column', 'row', 'row', 'row']}
                    alignItems='center'
                    justifyContent='center'
                >
                {savedRequests.map(request => (
                    <WrapItem
                        key={request.uid}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
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
