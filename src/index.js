import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";
import App from "./components/App";
import Calculator from "./components/Calculator";
import PostMethod from "./components/PostMethod";
import ModelCalculations from "./components/ModelCalculations";
import CsvUpload from "./components/CsvUpload";
import SelectModelPageTrash from "./components/trash.jsx";
import SelectModelPage from "./routes/selectModelPage";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(

        <BrowserRouter>

      <App/>

  </BrowserRouter>




);