import "./styles/tokens.css";
import "./styles/layout.css";
import { start } from "./ui/app";

const mount = document.querySelector<HTMLElement>("#app");
if (mount) start(mount);
