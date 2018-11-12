import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import React from "react";
import serialize from "serialize-javascript";
import { matchPath } from "react-router-dom";
import routes from "../shared/routes";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("*", (req, res, next) => {
        const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

        const promise = activeRoute.fetchInitialData ?
            activeRoute.fetchInitialData(req.url) : Promise.resolve();

        promise.then((data) => {
            const markup = renderToString(
                <App data={data}/>
            )
            res.send(
                `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <title>SSR</title>
                            <script src="/bundle.js" defer></script>
                            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                        </head>
                         <body>
                           <div id="app">${markup}</div>
                         </body>
                         </html>`
            )
        })
    }
)

app.listen(3010, () => {
    console.log("We are on 3010")
});

