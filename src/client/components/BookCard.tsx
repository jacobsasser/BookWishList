import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { QueryResult } from "../types";
import useStore from "../store";

type BookCardProps = {
  data: QueryResult;
};

const BookCard = ({ data }: BookCardProps) => {
  const savedResults = useStore((state) => state.savedResults);
  const setSavedResults = useStore((state) => state.setSavedResults);
  const setMessage = useStore((state) => state.setMessage);

  const handleAdd = () => {
    setSavedResults([...savedResults, data]);
    setMessage(['add', data.title]);
  };
  const handleRemove = () => {
    setSavedResults(savedResults.filter((ele) => ele.key !== data.key));
    setMessage(['remove', data.title]);
  };
  return (
    <Card justify={'center'} align={'center'} colorScheme={'teal'} variant={'outline'}>
      <CardHeader>
        <Heading size="md" data-cy='cardHeader'>{data.title}</Heading>
      </CardHeader>
      <CardBody>
        <div style={{ display: "flex" }} data-cy='cardAuthors'>
          <Text fontWeight="bold">Authors:</Text>
          <Text marginLeft={"2px"}>
            {" "}
            {data.authors.length === 1
              ? data.authors[0].name
              : `${data.authors[0].name} et. al`}
          </Text>
        </div>
        <div style={{ display: "flex" }} data-cy='cardPublish'>
          <Text fontWeight="bold">Published:</Text>
          <Text marginLeft={"2px"}>{" "}{data.first_publish_year}</Text>
        </div>
      </CardBody>
      <CardFooter>
        {savedResults.includes(data) ? (
          <Button colorScheme="teal" variant="solid" onClick={handleRemove} data-cy='cardButton'>
            Remove
          </Button>
        ) : (
          <Button colorScheme="teal" variant="outline" onClick={handleAdd} data-cy='cardButton'>
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
