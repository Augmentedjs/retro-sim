import { Elements } from "@augmentedjs/elements";
import "presentation-css";
import "material-icons";
import "typeface-roboto";
import "./styles/main.scss";
import App from "./views/app.jsx";

Elements.render(<App />, document.getElementById("app"));
