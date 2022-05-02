import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Router from "next/router";

export default function BackButton() {
  const goBack = () => {
    Router.back();
  };

  return (
    <IconButton
      onClick={goBack}
      size="lg"
      variant="ghost"
      aria-label="Back to previous page"
      icon={<ChevronLeftIcon boxSize="10" />}
    />
  );
}
