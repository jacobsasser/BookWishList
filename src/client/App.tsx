import React from "react";
import { render } from "react-dom";
import ViewBox from "./components/ViewBox";
import MessageBox from "./components/MessageBox";
import BookContainer from "./components/BookContainer";

type saved = {
    title:string;
    authors:string;
}

const App = () => {
  const [viewCount, setViewCount] = React.useState(0);
  const [currentlySaved, setCurrentlySaved] = React.useState<saved[]>([]);
  return (
    <div>
      <h1>Book Wish List</h1>
      <div className="TopBar">
        <MessageBox />
        <ViewBox viewCount={viewCount} currentlySaved={currentlySaved}/>
      </div>
      <BookContainer setViewCount={setViewCount} setCurrentlySaved={setCurrentlySaved}/>
    </div>
  );
};
render(<App />, document.querySelector("#root"));
