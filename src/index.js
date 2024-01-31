import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Providers from "./redux/Provider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
);
