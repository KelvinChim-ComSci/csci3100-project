/**************************************************************************************** 
This component is activated when the loader spinner is required. It is to inform user
that the system is still loading.

Last updated: 5/5/2022 by Au Tsz Nga
****************************************************************************************/

import React from "react";
import * as Loader from "react-loader-spinner";


const Loading = () => {
    require("./Loader.css");

    return (
        <div className="blackBackground">
            <div className="container">
                <Loader.RotatingSquare className="loader" color="#FFFFFF" height={80} width={80} />
                <div id="loadingText">Loading...</div>
            </div>
        </div>
    )
};

export default Loading; 