import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import React from "react";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("*", (req, res, next) => {
        const markup = renderToString(
            <App data={"Niki"}/>
        )
        res.send(
            `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>SSR</title>
          <script src="/bundle.js" defer></script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
        </html>`
        )
    }
)

app.listen(3010, () => {
    console.log("We are on 3010")
});

