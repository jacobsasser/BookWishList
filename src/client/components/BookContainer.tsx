import React from "react";
import useStore from "../store";
import { SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";

const BookContainer = () => {
  const [loading, setLoading] = React.useState(false);
  const offset = useStore((state) => state.offset);
  const bookResults = useStore((state) => state.bookResults);
  const setOffset = useStore((state) => state.setOffset);
  const setBookResults = useStore((state) => state.setBookResults);

  const fetchBookData = async () => {
    setLoading(true);
    fetch(
      `https://openlibrary.org/subjects/health.json?limit=12&offset=${offset}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setBookResults([...bookResults, ...data.works]);
        setOffset(offset + 12);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 200 && !loading) {
      fetchBookData();
    }
  };
  // Handle scrolls for infinite loading
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // Re-attach event listener when loading changes

  // On DOM Content load, fetch from API
  React.useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <SimpleGrid columns={3} spacing={4} p='4' pt='20'>
      {bookResults.length > 0 &&
        bookResults.map((bookData, index) => (
          <BookCard key={index} data={bookData} />
        ))}
    </SimpleGrid>
  );
};

export default BookContainer;
