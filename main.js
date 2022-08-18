import { MainViewer } from "./viewer/mainViewer.js";

window.onload = () => {
    document.body.style.fontSize = "62.5%";
    const mainViewer = new MainViewer();
    document.body.appendChild(mainViewer.container);
};
