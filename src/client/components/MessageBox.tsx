import {
  Flex,
  Center,
  Text,
  Button,
  Spacer,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import React from "react";
import useStore from "../store";

const MessageBox = () => {
  const message = useStore((state) => state.message);
  const savedResults = useStore((state) => state.savedResults);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={"teal"}
      p="2"
      position="fixed"
      top="0"
      width="100%"
      zIndex="999"
      h="16"
    >
      <Center p="2" data-cy='message'>
        {message[0] === "default" ? (
          <Text color="white">{message[1]}</Text>
        ) : message[0] === "add" ? (
          <Box as="span" color="white">
            Added{" "}
            <Text as="span" color="white" fontWeight="bold">
              {message[1]}
            </Text>{" "}
            to your list.
          </Box>
        ) : (
          <Box as="span" color="white">
            Removed{" "}
            <Text as="span" color="white" fontWeight="bold">
              {message[1]}
            </Text>{" "}
            from your list.
          </Box>
        )}
      </Center>
      <Spacer />
      <Center p="2">
        <Button
          variant={"outline"}
          bg="white"
          color='teal'
          onClick={onOpen}
          isDisabled={savedResults.length === 0}
          data-cy='viewButton'
        >
          {`View (${savedResults.length})`}
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent data-cy='modal'>
          <ModalHeader>My WishList</ModalHeader>
          <ModalCloseButton data-cy='closeModal'/>
          <ModalBody>
            <UnorderedList>
                {savedResults.map((books,index) =>
                    <ListItem key={index} data-cy='list'>{books.title}</ListItem>
                )}
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MessageBox;
