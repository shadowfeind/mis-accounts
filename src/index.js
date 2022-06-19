require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { USER_SESSION } from "./constants";

// if (USER_SESSION) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById("app")
//   );
// } else {
//   window.location.href = "http://103.90.86.151:100/";
// }

sessionStorage.setItem(
  "blueberrytoken",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWJhNWI5ZC1lMjVkLTRhMDAtOTdlNy1jYTYwZWJkMjg0ZGEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTUwNzgiLCJJRFVzZXIiOiIxNTA3OCIsIklEUm9sZSI6IjEwMTUiLCJNYXJrQXNBZG1pbiI6IkZhbHNlIiwiSURIUkJyYW5jaCI6IjEiLCJJRERlcGFydG1lbnQiOiIxIiwiY29tcGFueSI6IjIiLCJJc1RlbXBvcmFyeVNlc3Npb25FbmFibGVkIjoiRmFsc2UiLCJJc05ld2x5QWRlZCI6IkZhbHNlIiwiSXNEZXBhcnRtZW50SGVhZCI6IkZhbHNlIiwiUmVtZW1iZXJNZSI6IkZhbHNlIiwiRnVsbE5hbWUiOiJBY2NvdW50ICBBY2NvdW50IiwicGlkUmVmRm9yRWRpdCI6ImFjY291bnQiLCJleHAiOjE2NTU4NzgwNTgsImlzcyI6Imh0dHA6Ly9teXNpdGUuY29tIiwiYXVkIjoiaHR0cDovL215c2l0ZS5jb20ifQ.PQI3O8JXVPoW8f11cFC9NlGb67Gf9xDXUuSxYYNfmBc"
);
sessionStorage.setItem(
  "blueberryrefreshtoken",
  "j+TiAr8Q0saoEvfn87GPTSf0nM03WLdS3Nlo4KtTeeg="
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
