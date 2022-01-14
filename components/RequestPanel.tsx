import { Button, Flex, Input, position, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { methods } from '@services/utils/request'
import PanelLayout from './utils/PanelLayout'
import Authorization from './request/Authorization'
import Content from './request/Content'
import Headers from './request/Headers'
import Raw from './request/Raw'
import { AppRequestType, AppResponse } from '@models/request'
import { fromRequestToRawRequest, makeRequest } from '@services/request'
import { IoSend } from 'react-icons/io5'
import { AiFillSave } from 'react-icons/ai'
import SaveRequest from './request/SaveRequest'


type WindowProps = any & {
    displayed: boolean
}

const windows: {[key: string]: (props: WindowProps) => JSX.Element} = {
    'Authorization': Authorization,
    'Content': Content,
    'Headers': Headers,
    'Raw': Raw
}

type Props = {
    setCurrentResponse: (response: AppResponse) => void,
    currentRequest: AppRequestType, 
    setCurrentRequest: React.Dispatch<React.SetStateAction<AppRequestType>>,
}

export default function RequestPanel({ setCurrentResponse, currentRequest, setCurrentRequest }: Props) {

    const toast = useToast()

    const [currentWindow, setCurrentWindow] = useState(Object.keys(windows)[0])
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const memoizedValue = useMemo(() => fromRequestToRawRequest(currentRequest), [currentRequest])

    return (
        <PanelLayout>
            <Stack
                spacing={4}
                direction='column'
            >
                <Stack
                    spacing={4}
                    direction='row'
                >
                    <Input 
                        placeholder='https://maxenceraballand.com' 
                        minWidth='250px' 
                        flex={['4', '4', '3', '3']} 
                        onChange={(e) => {
                            setCurrentRequest(r => ({
                                ...r,
                                url: e.target.value
                            }))
                        }} 
                        value={currentRequest.url} 
                    />
                    <Select 
                        flex={['2', '2', '1', '1']}
                        onChange={(e) => {
                            setCurrentRequest(r => ({
                                ...r,
                                method: e.target.value
                            }))
                        }}
                        value={currentRequest.method}
                    >
                        {methods.map((method) => {
                            return <option key={method} value={method}>{method}</option>
                        })}
                    </Select>
                </Stack>
                <Stack
                    spacing={4}
                    direction='row'
                >
                    {Object.keys(windows).map((window) => 
                        <Button
                            key={window}
                            onClick={() => {
                                setCurrentWindow(window)
                            }}
                            variant={currentWindow === window ? 'solid' : 'outline'}
                            colorScheme='teal'
                        >{window}</Button>
                    )}
                </Stack>
                <Authorization 
                    displayed={currentWindow === 'Authorization'}
                    authorization={currentRequest.authInfo}
                    onAuthorizationChange={(authInfo) => {
                        setCurrentRequest(r => ({
                            ...r,
                            authInfo
                        }))
                    }}
                />
                <Content
                    displayed={currentWindow === 'Content'}
                    onContentChange={(body) => {
                        setCurrentRequest(r => ({
                            ...r,
                            body
                        }))
                    }}
                    content={currentRequest.body}
                    onContentTypeChange={(contentType) => {
                        setCurrentRequest(r => ({
                            ...r,
                            headers: [
                                ...r.headers.filter(h => h.name !== 'Content-Type'),
                                {...r.headers.filter(h => h.name === 'Content-Type')[0], value: contentType}
                            ]
                        }))
                    }}
                    contentType={currentRequest.headers.filter(h => h.name === 'Content-Type')[0]?.value}
                />
                <Headers
                    displayed={currentWindow === 'Headers'}
                    headers={currentRequest.headers}
                    onHeadersChange={(headers) => {
                        setCurrentRequest(r => ({
                            ...r,
                            headers
                        }))
                    }}
                />
                <Raw
                    displayed={currentWindow === 'Raw'}
                    content={memoizedValue}
                />
                <Flex
                    direction='row'
                    justify='flex-end'
                >
                    <Stack
                        direction='row'
                        spacing={4}
                    >   
                        <Button
                            variant='outline'
                            colorScheme='green'
                            rightIcon={<AiFillSave/>}
                            onClick={() => {
                                // Check if the url is valid and not empty
                                if (!currentRequest.url || currentRequest.url.length === 0) {
                                    toast({
                                        title: 'Error',
                                        description: 'The url is empty',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                        position: 'bottom-left'
                                    })
                                } else {
                                    try {
                                        new URL(currentRequest.url)
                                        setIsSaveAlertOpen(true)
                                    } catch (e) {
                                        toast({
                                            title: 'Error',
                                            description: 'The url is invalid',
                                            status: 'error',
                                            duration: 3000,
                                            isClosable: true,
                                            position: 'bottom-left'
                                        })
                                    }
                                }
                            }}
                        >Save Request</Button>
                        <Button
                            variant='solid'
                            colorScheme='teal'
                            rightIcon={<IoSend/>}
                            isLoading={loading}
                            onClick={async () => {
                                setLoading(true)
                                const res = await makeRequest(currentRequest)
                                setCurrentResponse(res)
                                setLoading(false)
                            }}
                        >Request</Button>
                    </Stack>
                </Flex>
                <SaveRequest
                    currentRequest={currentRequest}
                    isOpen={isSaveAlertOpen}
                    triggerClose={() => {
                        setIsSaveAlertOpen(false)
                    }}
                />
            </Stack>
        </PanelLayout>
    )
}
