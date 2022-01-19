import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorMode,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'
import { downloadSavedRequests, importRequests } from '@services/localStorage'

import { BsThreeDots, BsGithub, BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

import { BiExport, BiImport } from 'react-icons/bi'



export default function MyMenu() {

    const toast = useToast()
    const ToggleColorModeIcon = useColorModeValue(BsFillSunFill, BsFillMoonFill)
    const { colorMode, toggleColorMode } = useColorMode()

    const handleImportRequests = () => {
        // Choose file
        try {
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = '.json'
            fileInput.onchange = async (e) => {
                const target = e.target as HTMLInputElement
                const file = target.files?.item(0)
                if (!file) {
                    return
                }
                // Read file
                const done = importRequests(file)
                toast({
                    title: 'Successfully imported',
                    description: 'Your saved requests have been imported',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-left',
                })
            }
            fileInput.click()
        } catch (error) {
            toast({
                title: 'Error while importing',
                description: 'There was an error importing your requests',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

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
                <MenuItem icon={<BiImport />} onClick={handleImportRequests}> 
                    Import requests
                </MenuItem>
                <MenuItem icon={<BiExport/>} onClick={downloadSavedRequests}>
                    Export saved requests
                </MenuItem>
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