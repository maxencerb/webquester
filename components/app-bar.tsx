import { Flex, Heading, IconButton, Spacer, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { BsFillSunFill, BsFillMoonFill, BsFillLightningChargeFill} from 'react-icons/bs'
import React from 'react'
import MyMenu from './utils/menu'

export default function AppBar() {

    const ToggleColorModeIcon = useColorModeValue(BsFillSunFill, BsFillMoonFill)
    const { colorMode, toggleColorMode } = useColorMode()
    const bgColor = useColorModeValue('white', 'gray.800')

    return (<>
        <Flex
            p="4"
            align="center"
            position='sticky'
            top='0'
            boxShadow='0px 2px 4px rgba(0, 0, 0, 0.1)'
            zIndex='100'
            w='100%'
            bg={bgColor}
        >
            <BsFillLightningChargeFill
                size='24px'
                marginRight='4'
                color='#50c8c5'
            />
            <Heading
                marginLeft='4'
                fontSize='xl'
            >WebQuester</Heading>
            <Spacer />
            <IconButton
                aria-label="Toggle color mode"
                icon={<ToggleColorModeIcon/>}
                onClick={toggleColorMode}
                display={['none', 'inherit']}
                mr='3'
            />
            <MyMenu />
        </Flex>
    </>
    )
}