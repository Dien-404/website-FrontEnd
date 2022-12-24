import React, { Suspense } from "react";
import Router from "./routers";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Suspense
            fallback={
                <div className="w-screen h-screen flex justify-center items-center">
                    loading...
                </div>
            }
        >
            <Router />
        </Suspense>
    </BrowserRouter>
    // </React.StrictMode>
);
