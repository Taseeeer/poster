'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './globals.css'

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      'html, body': {
        fontSize: 'sm',
        color: props.colorMode === 'dark' ? 'whitesmoke' : 'gray.600',
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
    }),
  },
  colors: {
    gray: {
      100: 'rgba(0,0,0,0.1)',
      200: 'rgba(0,0,0,0.8)',
    },
    white: {
      100: 'whitesmoke',
    },
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraProvider theme={theme}>
          {/* <Box bgGradient="linear(to-r, blue.300, blue.400, blue.500)"> */}
            {children}
          {/* </Box> */}
        </ChakraProvider>
      </body>
    </html>
  )
}
