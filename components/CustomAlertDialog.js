import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogContent,
  useDisclosure
} from "@chakra-ui/react";
import Router from "next/router"
export default function CustomAlertDialog({
  color,
  buttonText,
  header,
  body,
}) {

  const goBack = () => {
    Router.back();
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme={color} onClick={onOpen}>
        {buttonText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        onCloseComplete={goBack}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={color} onClick={onClose} ml={3}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
