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
} from "@chakra-ui/react";
import Router from "next/router";
export default function InstantAlertDialog({ color, header, body }) {
  const goBack = () => {
    Router.push("/");
    // Router.back();
  };
  const { onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme={color} onClick={goBack}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
