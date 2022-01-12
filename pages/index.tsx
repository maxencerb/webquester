import AppBar from '@components/app-bar'
import type { NextPage } from 'next'
import Head from 'next/head'

import { localRequest } from '@services/request'
import { Center, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import RequestPanel from '@components/RequestPanel'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import SavedRequests from '@components/saves/SavedRequests'

const Home: NextPage = () => {
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
        <RequestPanel/>
      </Flex>

      
      <SavedRequests
          loadRequest={(request) => {}}
      />

    </Stack>
  )
}

export default Home
