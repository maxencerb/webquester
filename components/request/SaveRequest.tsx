import { AppRequestType } from '@models/request'
import React, { RefObject, useRef, useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Stack,
    Text,
    Input,
    useToast
  } from '@chakra-ui/react'
import { saveRequest } from '@services/localStorage'

type Props = {
    currentRequest: AppRequestType,
    isOpen: boolean,
    triggerClose: () => void,
}

export default function SaveRequest({ currentRequest, isOpen, triggerClose }: Props) {
    
    const toast = useToast()
    const cancelRef = useRef() as RefObject<any>;
    const [title, setTitle] = useState('')


    const handleSave = () => {
        if (title.length === 0) {
            toast({
                title: 'Title is required',
                description: 'Please enter a title for your request',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'bottom-left',
            })
            return
        }
        const isSaved = saveRequest(currentRequest, title)
        if (!isSaved) {
            toast({
                title: 'Too much saved requests',
                description: 'You have to delete some requests to save this one',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        } else {
            toast({
                title: 'Request saved',
                description: 'Your request has been saved',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
        triggerClose()
        setTitle('')
    }

    const handleCancel = () => {
        triggerClose()
        setTitle('')
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={() => {

            }}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Save Request
                </AlertDialogHeader>

                <AlertDialogBody>
                    <Stack spacing={4}>
                        <Text> 
                            Choose a title for the request
                        </Text>
                        <Input
                            placeholder='Request Title'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    </Stack>
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button colorScheme='green' onClick={handleSave} ml={3}>
                    Save
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
      )
}
