import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { AppRequestType, SaveRequestType } from '@models/request'
import React from 'react'

type Props = {
    loadRequest: (request: AppRequestType) => void,
} & SaveRequestType

export default function SavedRequest({ title, request, uid, loadRequest }: Props) {
    return (
        <Box
            as='button'
            rounded='md'
            border='1px solid'
            p={2}
            onClick={() => loadRequest(request)}
            w='200px'
            h='150px'
        >
            <Heading
                as='h5'
                fontSize='sm'
            >
                {title}
            </Heading>
            <Link
                href={request.url}
                isExternal
                target='_blank'
            >
                {request.url}
            </Link>
        </Box>
    )
}
