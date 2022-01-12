import { Button, CloseButton, Flex, Input, Spacer, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HeadersType } from '@models/request'
import { createRandomUid } from '@services/utils/uid'

type Props = {
    displayed: boolean,
    onHeadersChange: (headers: HeadersType) => void,
    headers: HeadersType
}

export default function Headers({ displayed, onHeadersChange, headers }: Props) {
    
    return (
        <Stack
            spacing={4}
            direction='column'
            display={displayed ? 'block' : 'none'}
            rounded={'md'}
            borderWidth="1px"
            p={4}
        >
            {headers.map((header, idx) => {
                return (
                    <Stack
                        key={header.uid}
                        spacing={4}
                        direction='row'
                        alignItems='center'
                    >
                        <CloseButton
                            color='red.500'
                            onClick={() => {
                                onHeadersChange(headers.filter(h => h.uid !== header.uid))
                            }}
                        />
                        <Input
                            value={header.name}
                            onChange={(e) => {
                                onHeadersChange(headers.map((h, i) => {
                                    if (header.uid === h.uid) {
                                        return {
                                            ...h,
                                            name: e.target.value
                                        }
                                    }
                                    return h
                                }))
                            }}
                        />
                        <Input 
                            value={header.value}
                            onChange={(e) => {
                                onHeadersChange(headers.map((h, i) => {
                                    if (header.uid === h.uid) {
                                        return {
                                            ...h,
                                            value: e.target.value
                                        }
                                    }
                                    return h
                                }))
                            }}
                        />
                    </Stack>
                )
            })}

            <Flex>
                <Spacer/>
                <Button
                    onClick={() => {
                        if(headers.filter(h => h.name === '').length === 0) {
                            onHeadersChange([...headers, { name: '', value: '', uid: createRandomUid() }])
                        }
                    }}
                    colorScheme='green'
                >Add header</Button>
            </Flex>
        </Stack>
    )
}
