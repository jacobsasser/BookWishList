import React from "react";

type Author = {
  key: string;
  name: string;
};
type saved = {
    title:string;
    authors:string;
}

type BookCardProps = {
  setViewCount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  authors: Author[];
  setCurrentlySaved: React.Dispatch<React.SetStateAction<saved[]>>

};

const BookCard = ({ setViewCount, title, authors, setCurrentlySaved }: BookCardProps) => {
  const authorsString = authors.map((author) => author.name).join(", ");
  const [isAdded, setIsAdded] = React.useState(false);

  const handleClick = () => {
    setViewCount((prevState) => {
      return isAdded ? --prevState : ++prevState;
    });
    setCurrentlySaved((prevState) => {
        if (!isAdded) {
          // Add the book to the saved list
          return [...prevState, { title: title, authors: authorsString }];
        } else {
          // Remove the book from the saved list
          return prevState.filter((book) => {
            return book.title !== title || book.authors !== authorsString;
          });
        }
      });
    setIsAdded(!isAdded);
  };
  return (
    <div className="BookCard">
      <h2>{title}</h2>
      <p>Written by:</p>
      <p className="Authors">{authorsString}</p>
      <button
  className="AddRemoveButton"
  onClick={handleClick}
  style={{
    backgroundColor: isAdded ? "red" : "lightblue",
    transition: "background-color 0.3s",
  }}
>
        {isAdded ? "REMOVE" : "ADD"}
      </button>
    </div>
  );
};
export default BookCard;
