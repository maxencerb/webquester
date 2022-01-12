import React, { useState } from 'react'
import { requestAuthorizations } from '@services/utils/request'
import { Box, Flex, Heading, Input, Radio, RadioGroup, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AuthorizationInfo } from '@models/request'

type Props = {	
    displayed: boolean,
    onAuthorizationChange: (authorization: AuthorizationInfo) => void,
    authorization: AuthorizationInfo
}

export default function Authorization({ displayed, onAuthorizationChange, authorization }: Props) {
    
    const infoTextColor = useColorModeValue('gray.800', 'gray.400')
    
    return (
        <Stack
            spacing={4}
            direction='column'
            display={displayed ? 'block' : 'none'}
        >
            <RadioGroup
                onChange={(val: string) => {
                    if (val === 'Basic') {
                        onAuthorizationChange({
                            type: 'Basic',
                            username: '',
                            password: ''
                        })
                    } else if (val === 'Bearer' || val == 'Custom') {
                        onAuthorizationChange({
                            type: val,
                            token: ''
                        })
                    }
                }}
                defaultValue={requestAuthorizations[0]}
            >
                <Stack
                    spacing={4}
                    direction='row'
                >
                    {requestAuthorizations.map((authorization) => {
                        return (
                            <Radio 
                                key={authorization} 
                                value={authorization}
                                colorScheme='teal'
                            >{authorization}</Radio>
                        )
                    })}
                </Stack>
            </RadioGroup>
            <Box 
                rounded='md' 
                borderWidth='1px'
                p={4}
            >
                <Stack
                    spacing={4}
                    direction='column'
                >
                    <Heading as='h3' size='sm'>{authorization.type} Authorization</Heading>
                    <Stack
                        spacing={4}
                        direction='row'
                        alignItems='center'
                    >
                        <Text as='span'>
                            {authorization.type === 'Basic' ? 'Username' : authorization.type === 'Bearer' ? 'Token' : 'Content'}
                        </Text>
                        <Input 
                            placeholder={authorization.type === 'Basic' ? 'Username' : authorization.type === 'Bearer' ? 'Token' : 'Content'}
                            value={authorization.type === 'Basic' ? authorization.username : authorization.token}
                            onChange={(e) => {
                                if (authorization.type === 'Basic') {
                                    onAuthorizationChange({
                                        ...authorization,
                                        username: e.target.value
                                    })
                                } else if (authorization.type === 'Bearer' || authorization.type === 'Custom') {
                                    onAuthorizationChange({
                                        ...authorization,
                                        token: e.target.value
                                    })
                                }
                            }}
                        />
                    </Stack>
                    {authorization.type === 'Basic' && 
                        <Stack
                            spacing={4}
                            direction='row'
                            alignItems='center'
                        >
                            <Text as='span'>
                                Password
                            </Text>
                            <Input
                                placeholder='Password'
                                type='password'
                                value={authorization.password}
                                onChange={(e) => {
                                    onAuthorizationChange({
                                        ...authorization,
                                        password: e.target.value
                                    })
                                }}
                            />
                        </Stack>
                    }
                    <Text
                        fontSize='sm'
                        fontWeight='thin'
                        color={infoTextColor}
                    >
                        {
                            authorization.type === 'Basic' ? 'Basic Authorization is used to authenticate a user with a username and password.' : authorization.type === 'Bearer' ? 'Bearer Token is used to authenticate a user with a bearer token.' : 'Custom Authorization is used to authenticate a user with a custom authorization header.'
                        }
                    </Text>
                </Stack>
            </Box>
        </Stack>
    )
}
