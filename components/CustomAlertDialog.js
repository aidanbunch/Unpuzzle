import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogContent,
  useDisclosure,
  Spacer,
  Flex
} from "@chakra-ui/react";
import Router from "next/router"
export default function CustomAlertDialog({
  color,
  header,
  body,
}) {

  React.useEffect(() => {
    // Update the document title using the browser API
    console.log("APPEARED")
  }, []);

  const goBack = () => {
    Router.back();
  };
  const { onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      {/* <Button colorScheme={color} onClick={onOpen}>
        {buttonText}
      </Button> */}

      <AlertDialog
        isOpen={true}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        onCloseComplete={goBack}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body}
            </AlertDialogBody>

            <AlertDialogFooter >

              <Button colorScheme={color} onClick={goBack}>
                Ok
              </Button>


            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
