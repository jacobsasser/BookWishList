import React from "react";

type ViewBoxProps = {
    viewCount:number
};

const ViewBox = ({viewCount}:ViewBoxProps) =>{
    return (
        <div>
            <p>View ({viewCount})</p>
        </div>
    )
}

export default ViewBox;