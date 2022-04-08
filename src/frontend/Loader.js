import React from "react";
import * as Loader from "react-loader-spinner";


const Loading = () => {
    require("./Loader.css");

    return (
        <div className="blackBackground">
            <div className="container">
                <Loader.RotatingSquare class="loader" color="#FFFFFF" height={80} width={80} />
                Loading...
            </div>
        </div>
    )
};

export default Loading; 