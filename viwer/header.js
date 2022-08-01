
class HeaderContainer {
    static headerContainer = () => {
        const container = document.createElement("div")

        container.appendChild(this.header())
        return container
    }

    static header = () => {
        const header = document.createElement("h1")

        header.innerText = "エニグマ暗号化/復号化アプリ ver0.3"
        header.style.fontSize = "3rem"
        return header
    }
}

export { HeaderContainer }
