import React, { useState } from "react";

type saved = {
  title: string;
  authors: string;
};

type ViewBoxProps = {
  viewCount: number;
  currentlySaved: saved[];
};

const ViewBox = ({ viewCount, currentlySaved }: ViewBoxProps) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button className="ViewButton" onClick={toggleModal}>
        View ({viewCount})
      </button>
      {showModal && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <button className="CloseButton" onClick={toggleModal}>
              <span>X</span>
            </button>
            <h2>Saved Books</h2>
            <ul>
              {currentlySaved.map((book, index) => (
                <li key={index}>
                  <strong>Title:</strong> {book.title}
                  <br />
                  <strong>Authors:</strong> {book.authors}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBox;
