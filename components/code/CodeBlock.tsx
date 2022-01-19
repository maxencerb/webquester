import { Box, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
// import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BsClipboard } from 'react-icons/bs';

type Props = {
    language: 'javascript' | 'bash' | 'python';
    children: string;
}

// SyntaxHighlighter.registerLanguage('javascript', js);
// SyntaxHighlighter.registerLanguage('bash', bash);
// SyntaxHighlighter.registerLanguage('python', python);

export default function CodeBlock({ language, children }: Props) {

    const style = useColorModeValue(prism, dracula)

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if(isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }
    }, [isCopied])

    return (
        <Box
            position='relative'
        >
            <SyntaxHighlighter language={language} style={{
                ...style,
                borderRadius: '1rem',
            }}>
                {children}
            </SyntaxHighlighter>
            <Tooltip
                label={isCopied ? 'Copied' : 'Copy to clipboard'}
            >
                <IconButton
                    aria-label='Copy to Clipboard'
                    position='absolute'
                    top='.5rem'
                    right='.5rem'
                    opacity='.7'
                    icon={<BsClipboard />}
                    onClick={() => {
                        navigator.clipboard.writeText(children);
                        setIsCopied(true);
                    }}
                />
            </Tooltip>
        </Box>
    );
}
