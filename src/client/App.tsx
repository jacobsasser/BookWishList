import React from "react";
import { render } from "react-dom";
import ViewBox from './components/ViewBox';
import MessageBox from './components/MessageBox';
import BookContainer from './components/BookContainer';

const App = () => {
    const [viewCount, setViewCount] = React.useState(0);
    return (
        <div>
            <h1>Book Wish List</h1>
            <ViewBox viewCount={viewCount}/>
            <MessageBox/>
            <BookContainer viewCount={viewCount} setViewCount={setViewCount}/>
        </div>
    )
};
render(<App/>, document.querySelector('#root'))