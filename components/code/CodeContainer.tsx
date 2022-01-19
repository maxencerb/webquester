import { 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    ModalFooter, 
    Button, 
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';
import { AppRequestType } from '@models/request';
import { toCurlRequest, toJavaScriptRequest, toPythonRequest } from '@services/codeGenerator';
import React from 'react';

type Props = {
    isOpen: boolean;
    request: AppRequestType;
    onClose: () => void;
};

type CodeCompiler = {
    name: string;
    compiler: (request: AppRequestType) => string;
}

const codeCompilers: CodeCompiler[] = [
    {
        name: 'Curl',
        compiler: toCurlRequest,
    },
    {
        name: 'JavaScript',
        compiler: toJavaScriptRequest,
    },
    {
        name: 'Python',
        compiler: toPythonRequest,
    }
]

export default function CodeContainer({ isOpen, request, onClose }: Props) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Request source code</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs
                        variant="enclosed"
                    >
                        <TabList>
                            {codeCompilers.map(({ name }) => (
                                <Tab key={name}>{name}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {codeCompilers.map(({ name, compiler }) => (
                                <TabPanel key={name}>
                                    
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onClose}
                        colorScheme='teal'
                    >Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
