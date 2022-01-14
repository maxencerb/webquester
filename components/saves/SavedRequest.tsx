import { Badge, Box, Flex, Heading, IconButton, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AppRequestType, SaveRequestType } from '@models/request'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'

type Props = {
    loadRequest: (request: AppRequestType) => void,
} & SaveRequestType

const linkSizeLimit = 35

export default function SavedRequest({ title, request, timestamp, loadRequest }: Props) {
    
    const badgeColor = request.method === 'GET' ? 'blue' :
        request.method === 'POST' ? 'green' :
        request.method === 'PUT' ? 'yellow' :
        request.method === 'DELETE' ? 'red' : 'gray'

    const shortLink = request.url.length > linkSizeLimit ? request.url.substring(0, linkSizeLimit) + '...' : request.url
    
    const bg = useColorModeValue('gray.100', 'gray.700')

    return (
        <Flex
            rounded='md'
            p={2}
            w={['60vw', '200px', '200px', '200px']}
            h='150px'
            bg={bg}
            flexDirection='column'
            justifyContent='space-between'
        >
            <Flex
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Heading
                    as='h5'
                    fontSize='md'
                >
                    {title}
                </Heading>
                
            </Flex>
            <Text
                textAlign={'left'}
            >
                <Badge
                    colorScheme={badgeColor}
                    mr={2}
                    display='inline'
                >
                    {request.method}
                </Badge>
                {shortLink}
            </Text>
            <Text
                textAlign={'left'}
                fontSize='sm'
                fontWeight={'light'}
                opacity={.8}
            >{new Date(timestamp).toLocaleString()}</Text>
            <Stack
                spacing={2}
                direction='row'
                justifyContent='end'
            >
                <IconButton
                    aria-label='Edit'
                    icon={<BsPencil />}
                    onClick={() => loadRequest(request)}
                    variant='ghost'
                    size='sm'
                    colorScheme='blue'
                />

                <IconButton
                    aria-label={`Delete ${title}`}
                    icon={<AiOutlineDelete />}
                    colorScheme='red'
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                        console.log('Test')
                    }}
                />
            </Stack>
        </Flex>
    )
}
