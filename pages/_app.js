import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import UserProvider from "../context/user";
import theme from "../theme.js";
import Head from "next/head";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Unpuzzle</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* <script id="Adsense-id" data-ad-client="ca-pub-4915743237608302"
            async strategy="afterInteractive"
            onError={(e) => { console.error("Script failed to load", e) }}
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          /> */}
      </Head>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
