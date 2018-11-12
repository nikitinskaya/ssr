import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";


hydrate(
    <App data={"Vera"}/>,
    document.getElementById("app")
)
