import AppBar from '@components/app-bar'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Center, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import RequestPanel from '@components/RequestPanel'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import SavedRequests from '@components/saves/SavedRequests'
import ResponsePanel from '@components/ResponsePanel'
import ResponsePlaceholder from '@components/ResponsePlaceholder'
import { AppResponse } from '@models/request'
import { useState } from 'react'

const Home: NextPage = () => {
  
  const [currentResponse, setCurrentResponse] = useState<AppResponse>()
  
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
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <RequestPanel
          setCurrentResponse={setCurrentResponse}
        />
        {currentResponse ? 
          <ResponsePanel
            {...currentResponse}
          /> :  <ResponsePlaceholder/>
        } 
      </Flex>

      
      <SavedRequests
          loadRequest={(request) => {}}
      />

    </Stack>
  )
}

export default Home
