import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Unpuzzle</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
