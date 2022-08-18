import { HeaderContainer } from "./header.js";
import { EncriptionArea } from "./encriptionArea.js";

class MainViewer {
    constructor() {
        this.container = MainViewer.#container();
        this.encriptionArea = new EncriptionArea();

        this.container.appendChild(HeaderContainer.headerContainer());
        this.container.appendChild(this.encriptionArea.container);
    }

    static #container = () => {
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.minWidth = "300px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        return container;
    };
}

export { MainViewer };
