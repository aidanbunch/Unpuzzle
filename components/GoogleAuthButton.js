import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import {FaGoogle, FaTwitter} from "react-icons/fa"

export default function GoogleAuthButton() {
  return (
      <Button leftIcon={<FaGoogle />} colorScheme={"teal"} variant="solid">Sign in with Google</Button>
  )
}
