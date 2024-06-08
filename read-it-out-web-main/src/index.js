import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./responsive.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store/store";
ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <h1>hii</h1> */}
  </>,
  document.getElementById("root")
);

