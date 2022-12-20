import React from "react";
import "./index.css";
import Router from "./routers";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    // <React.StrictMode>
    <Router />
    // </React.StrictMode>
);
