// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css"; // Ensure you have a styles directory with a globals.css file

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
