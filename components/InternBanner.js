import { useRouter } from 'next/router'
import {
  Box,
  Button,
  CloseButton,
  Container,
  Icon,
  Square,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

export const InternBanner = ({ setShowBanner }) => {
  const router = useRouter()
  const closeBanner = () => {
    setShowBanner(false);

    console.log("close banner")
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <Container py={{ base: '4', md: '2.5' }} position="relative">
      <CloseButton display={{ sm: 'none' }} position="absolute" right="2" top="2" />
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        spacing={{ base: '3', md: '2' }}
      >
        <Stack
          spacing="4"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'start', md: 'center' }}
        >
          {!isMobile && (
            <Square size="12" bg="bg-subtle" borderRadius="md">
              <Icon as={FiInfo} boxSize="6" />
            </Square>
          )}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '0.5', md: '1.5' }}
            pe={{ base: '4', sm: '0' }}
          >
            <Text fontWeight="medium">
            We&apos;re looking for interns!
</Text>
            <Text color="muted">Read more about open positions</Text>
          </Stack>
        </Stack>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing={{ base: '3', sm: '2' }}
          align={{ base: 'stretch', sm: 'center' }}
        >
          <Button onClick={() => {
            router.push("/apply")

          }} variant="outline" width="full">
            Learn more
          </Button>
          <CloseButton onClick={closeBanner} display={{ base: 'none', sm: 'inline-flex' }} />
        </Stack>
      </Stack>
    </Container>
  )
}
