import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorMode,
    useColorModeValue
  } from '@chakra-ui/react'

import { BsThreeDots, BsGithub, BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export default function MyMenu() {

    const ToggleColorModeIcon = useColorModeValue(BsFillSunFill, BsFillMoonFill)
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<BsThreeDots />}
                variant='outline'
                ml='3'
            />
            <MenuList>
                <MenuItem icon={<ToggleColorModeIcon />} onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </MenuItem>
                <MenuItem icon={<BsGithub />} as='a' href='https://github.com/maxencerb/webquester' target='_blank'>
                    View on Github
                </MenuItem>
            </MenuList>
        </Menu>
    )
}