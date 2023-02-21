'use client';

import { Card, CardBody, Text, Heading, Button, Center, Box, Flex, useColorMode } from '@chakra-ui/react'
import { Inter } from '@next/font/google';
import Post from './post/page';
import { SiNextdotjs, SiChakraui, SiRailway, SiPrisma } from "react-icons/si";
import { HiSun, HiMoon } from 'react-icons/hi'

export default function Home() {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex justify="flex-end" padding="1rem" cursor="pointer">
        { colorMode === 'light' ? 
          <HiSun onClick={toggleColorMode} style={{ fontSize: "1.5rem"}} />
          :
          <HiMoon onClick={toggleColorMode} style={{ fontSize: "1.5rem"}} />
        }
      </Flex>
      <Card width={{ base: "350px", lg:"500px"}} textAlign="center" marginX="auto" paddingY="2rem" marginY="1rem" bgGradient='linear(to-r, green.200, pink.500)'>
        <CardBody>
          <Heading>Welcome to Poster.</Heading>
          <Text width="25ch" marginX="auto">Post enables you to post your stuff in here.</Text>
          <Button bgColor="gray.100" _hover={{ bgColor: ''}} marginTop="1rem">Sign In</Button>
        </CardBody>
      </Card>

      <Box>
        <Center>
          <Text>This application is powered by</Text>
        </Center>
        <Center paddingY="2rem">
          <Flex fontSize="3rem" gap="2rem">
            <SiNextdotjs />
            <SiChakraui />
            <SiRailway />
            <SiPrisma />
          </Flex>
        </Center>
      </Box>
    </Box>
  )
}
