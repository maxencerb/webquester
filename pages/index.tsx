import AppBar from '@components/app-bar'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Center, Container, Flex, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react'
import RequestPanel from '@components/RequestPanel'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import SavedRequests from '@components/saves/SavedRequests'
import ResponsePanel from '@components/ResponsePanel'
import ResponsePlaceholder from '@components/ResponsePlaceholder'
import { AppRequestType, AppResponse } from '@models/request'
import { useState, useEffect } from 'react'

const defaultRequest: AppRequestType = {
  method: 'GET',
  url: '',
  headers: [{
      name: 'Content-Type',
      value: 'application/json',
      uid: 'default'
  }],
  body: '',
  authInfo: {
      type: 'Bearer',
      token: ''
  }
}

const Home: NextPage = () => {
  
  const toast = useToast()

  const [currentResponse, setCurrentResponse] = useState<AppResponse>()
  const [currentRequest, setCurrentRequest] = useState<AppRequestType>(defaultRequest)

  useEffect(() => {
    if(currentResponse && currentResponse.type === 'error') {
      toast({
        title: 'Error',
        description: currentResponse.error,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }, [currentResponse, toast])
  
  return (
    <Stack
      spacing={4}
    >
      <Head>
        <title>WebQuester</title>
        <meta name="description" content="An open-source tool to test requests online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar/>

      <Center>
        <Stack
          spacing={4}
          direction='row'
          alignItems='center'
        >
          <BsFillLightningChargeFill
            size='24px'
            color='#50c8c5'
          />
          <Heading
            as="h1"
          >WebQuester</Heading>  
        </Stack>
      </Center>
          

      <Text
        textAlign="center"
      >An open-source tool to test requests online (<Link href='https://github.com/maxencerb/webquester' target='_blank'>view on Github</Link>)</Text>

      <Flex
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <RequestPanel
          setCurrentResponse={setCurrentResponse}
          currentRequest={currentRequest}
          setCurrentRequest={setCurrentRequest}
        />
        {/* If currentResponse is type of OkAppResponse */}
        {currentResponse && currentResponse.type === "ok" ? 
          <ResponsePanel
            {...currentResponse}
          /> :  <ResponsePlaceholder/>
        } 
      </Flex>

      <Center>
        <Container
          // centerContent
          maxW="container.xl"
        >
          <SavedRequests
              loadRequest={(request) => {
                  setCurrentRequest(request)
              }}
          />
        </Container>
      </Center>

    </Stack>
  )
}

export default Home
