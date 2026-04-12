import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import InviteVideo from "./InviteVideo";
import "./index.css";

const pathname = window.location.pathname.replace(/\/$/, "");
const RootComponent = pathname === "/invite" ? InviteVideo : App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
