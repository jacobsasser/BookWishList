import React, { useState, useEffect, useRef } from "react";
import BookCard from './BookCard';

type saved = {
  title:string;
  authors:string;
}

type BookContainerProps = {
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentlySaved: React.Dispatch<React.SetStateAction<saved[]>>
};

const BookContainer: React.FC<BookContainerProps> = ({setViewCount, setCurrentlySaved }) => {
  const [bookData, setBookData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 9; // Number of books to fetch in each batch
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    const handleScroll = () => {
      if (isFetchingRef.current) return;

      if (loadingRef.current && window.innerHeight + window.scrollY >= loadingRef.current.offsetTop) {
        isFetchingRef.current = true;
        fetchData();
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [offset]);

  const fetchData = () => {
    isFetchingRef.current = true;
    fetch(`https://openlibrary.org/subjects/health.json?limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setBookData((prevData) => [...prevData, ...(data.works || [])]); // Append new data
        setOffset(offset + limit); // Update the offset for the next batch
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        isFetchingRef.current = false; // Allow further fetching
      });
  };

  return (
    <div className="BookContainer">
      {bookData.map((book, index) => (
        <BookCard
          key={index}
          setViewCount={setViewCount}
          title={book.title}
          authors={book.authors}
          setCurrentlySaved={setCurrentlySaved}
        />
      ))}
      <div ref={loadingRef}>Loading...</div>
    </div>
  );
};

export default BookContainer;

// Generic Throttle function
function throttle<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null;
    return function (...args: Parameters<T>) {
      const context = this;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    } as T;
  }
