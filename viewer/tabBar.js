class Tab {
    constructor(backgroundColor, headlineText, event) {
        this.backgroundColor = backgroundColor;
        this.tab = Tab.#tab(this.backgroundColor, headlineText, event);
    }
    static #tab = (backgroundColor, headlineText, event) => {
        const tab = document.createElement("div");

        tab.style.backgroundColor = backgroundColor;
        tab.style.borderRadius = "8px 8px 0px 0px";
        tab.style.height = "100%";
        tab.style.fontSize = "22px";
        tab.style.textAlign = "center";
        tab.innerText = headlineText;
        tab.addEventListener("pointerdown", event);
        return tab;
    };

    showTab() {
        return this.tab;
    }
}

class TabBar {
    static tabBarContainer = (tabArray) => {
        const tabBar = this.#container();
        for (let tab of tabArray) {
            tabBar.appendChild(tab.showTab());
        }
        return tabBar;
    };

    static #container = () => {
        const tabBar = document.createElement("div");
        tabBar.style.width = "100%";

        tabBar.style.height = "30px";
        tabBar.style.display = "grid";
        tabBar.style.gridTemplateColumns = "1fr 1fr";
        return tabBar;
    };
}

export { Tab, TabBar };
