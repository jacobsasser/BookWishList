import React from "react";

type Author = {
    key: string;
    name: string;
  };

type BookCardProps = {
    viewCount: number;
    setViewCount: React.Dispatch<React.SetStateAction<number>>;
    title:string;
    authors:Author[]
}

const BookCard = ({viewCount, setViewCount, title, authors}:BookCardProps) => {
    const authorsString = authors.map((author) => author.name).join(', ');
    const [isAdded, setIsAdded] = React.useState(false);

    const handleClick = () => {
        setViewCount((prevState) => {
            return isAdded ? --prevState : ++prevState;
        })
        setIsAdded(!isAdded);
    }
    return(
        <div>
            <p>{title}</p>
            <p>By: {authorsString}</p>
            <button onClick={handleClick}>{isAdded? 'REMOVE' : 'ADD'}</button>
        </div>
    )
}
export default BookCard;