import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { render } from "react-dom";
import BookContainer from "./components/BookContainer";
import MessageBox from "./components/MessageBox";

const App = () => {

  return (
    <>
    <MessageBox/>
    <BookContainer/>
    </>
  );
};
render(<ChakraProvider>
  <App />
  </ChakraProvider>, document.querySelector("#root"));
