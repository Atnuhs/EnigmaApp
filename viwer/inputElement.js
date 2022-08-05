
class TextContainer {
    constructor(headlineText) {
        this.container = TextContainer.#container()
        this.headline = TextContainer.#headline(headlineText)
        this.input = TextContainer.#input()
        this.message = TextContainer.#message()

        this.container.appendChild(this.headline)
        this.container.appendChild(this.input)
        this.container.appendChild(this.message)
    }

    static #container = () => {
        const container = document.createElement("div")

        container.style.backgroundColor = "#eee"
        container.style.width = "10rem"
        container.style.borderRadius = "30% / 15%"
        container.style.padding = "8px"
        container.style.margin = "auto"

        container.style.display = "flex"
        container.style.flexDirection = "column"
        container.style.alignItems = "center"
        container.style.justifyContent = "center"
        return container
    }

    static #headline = (headlineText) => {
        const headline = document.createElement("p")

        headline.innerText = headlineText
        return headline
    }

    static #input = () => {
        const input = document.createElement("input")

        input.style.boxSizing = "border-box"
        input.style.width = "100%"
        input.style.fontSize = "16px"

        return input
    }

    static #message = () => {
        const message = document.createElement("p")
        message.style.overflowWrap = "word-break"
        return message
    }

    getInputValue = () => {
        return this.input.value
    }

    setInputValue = (value) => {
        this.input.value = value
    }

    setCautionMessage(message) {
        this.message.innerText = message
        this.message.style.color = "#f33"
        this.message.style.fontSize = "16px"
        this.message.style.fontStyle = "bold"
    }
}


class TextAreaContainer {
    constructor(headlineText) {
        this.container = TextAreaContainer.#container()
        this.headline = TextAreaContainer.#headline(headlineText)
        this.textArea = TextAreaContainer.#textArea()
        this.message = TextAreaContainer.#message()

        this.container.appendChild(this.headline)
        this.container.appendChild(this.textArea)
        this.container.appendChild(this.message)
    }

    static #container = () => {
        const container = document.createElement("div")

        container.style.backgroundColor = "#eee"
        container.style.minWidth = "10rem"
        container.style.borderRadius = "30% / 15%"
        container.style.padding = "8px"
        container.style.margin = "auto"

        container.style.display = "flex"
        container.style.flexDirection = "column"
        container.style.alignItems = "center"
        container.style.justifyContent = "center"
        return container
    }

    static #headline = (headlineText) => {
        const headline = document.createElement("p")

        headline.innerText = headlineText
        return headline
    }

    static #textArea = () => {
        const input = document.createElement("textArea")

        input.rows = 8
        input.cols = 30
        input.style.fontSize = "16px"
        return input
    }

    static #message = () => {
        const message = document.createElement("p")
        return message
    }

    getInputValue = () => {
        return this.textArea.value
    }

    setInputValue = (value) => {
        this.textArea.value = value
    }

    setCautionMessage(message) {
        this.message.innerText = message
        this.message.style.color = "#f33"
        this.message.style.fontSize = "16px"
        this.message.style.fontStyle = "bold"
    }
}

class EncryptContainer {
    constructor() {
        this.container = EncryptContainer.#container()
        this.headline = EncryptContainer.#headline()
        this.innerContainer = EncryptContainer.#innerContainer()
        this.communicationKeyContainer = EncryptContainer.#communicationKeyContainer()
        this.textToEncryptContainer = EncryptContainer.#textToEncryptContainer()
        this.encryptedTextContainer = EncryptContainer.#encryptedTextContainer()

        this.container.appendChild(this.headline)
        this.container.appendChild(this.innerContainer)
        this.innerContainer.appendChild(this.communicationKeyContainer.container)
        this.innerContainer.appendChild(this.textToEncryptContainer.container)
        this.innerContainer.appendChild(this.encryptedTextContainer.container)
    }


    static #container = () => {
        const container = document.createElement("div")

        container.style.backgroundColor = "#fbb"
        container.style.padding = "5px 30px"
        return container
    }

    static #headline = () => {
        const headline = document.createElement("p")

        headline.innerText = "暗号化"
        headline.style.backgroundColor = "hsla(260,100%,70%,0.5)"
        headline.style.margin = "5px"
        headline.style.padding = "5px 30px"
        headline.style.borderRadius = "20% / 50%"
        headline.style.width = "fit-content"
        return headline
    }

    static #innerContainer = () => {
        const innerContainer = document.createElement("div")

        innerContainer.style.display = "flex"
        innerContainer.style.justifyContent = "center"
        innerContainer.style.flexFlow = "wrap"
        innerContainer.style.margin = "5px"
        innerContainer.style.padding = "5px"
        return innerContainer
    }

    static #communicationKeyContainer = () => {
        const communicationKeyContainer = new TextContainer("通信鍵")

        communicationKeyContainer.input.maxLength = 6
        communicationKeyContainer.input.placeholder = "psvpsv"
        communicationKeyContainer.input.pattern = /([a-z]{3}){2}/
        communicationKeyContainer.container.style.border = "5px solid #7dd"
        communicationKeyContainer.headline.style.color = "#4aa"
        return communicationKeyContainer
    }

    static #textToEncryptContainer = () => {
        const textToEncryptContainer = new TextAreaContainer("平文")

        textToEncryptContainer.container.style.border = "5px solid #7dd"
        textToEncryptContainer.headline.style.color = "#4aa"
        return textToEncryptContainer
    }

    static #encryptedTextContainer = () => {
        const encryptedTextContainer = new TextAreaContainer("暗号文")

        return encryptedTextContainer
    }

    getContainer() {
        return this.container
    }

    communicationKeyValue() {
        return this.communicationKeyContainer.getInputValue()
    }

    textToEncryptValue() {
        return this.textToEncryptContainer.getInputValue()
    }

    encryptedTextValue() {
        return this.encryptedTextContainer.getInputValue()
    }

    setEncryptedText(encryptedText) {
        this.encryptedTextContainer.setInputValue(encryptedText)
    }

    setCautionCommunicationKey(message) {
        this.communicationKeyContainer.setCautionMessage(message)
    }

    setCautionTextToEncrypt(message) {
        this.textToEncryptContainer.setCautionMessage(message)
    }
}

class DecryptContainer {
    constructor() {
        this.container = DecryptContainer.#container()
        this.headline = DecryptContainer.#headline()
        this.innerContainer = DecryptContainer.#innerContainer()
        this.textToDecryptContainer = DecryptContainer.#textToDecryptContainer()
        this.decryptedCommunicationKeyContainer = DecryptContainer.#decryptedCommunicationKeyContainer()
        this.decryptedTextContainer = DecryptContainer.#decryptedTextContainer()

        this.container.appendChild(this.headline)
        this.container.appendChild(this.innerContainer)
        this.innerContainer.appendChild(this.textToDecryptContainer.container)
        this.innerContainer.appendChild(this.decryptedCommunicationKeyContainer.container)
        this.innerContainer.appendChild(this.decryptedTextContainer.container)
    }

    static #container = () => {
        const container = document.createElement("div")

        container.style.backgroundColor = "#bfb"
        container.style.padding = "5px 30px"
        return container
    }

    static #headline = () => {
        const headline = document.createElement("p")

        headline.innerText = "復号化"
        headline.style.backgroundColor = "hsla(260,100%,70%,0.5)"
        headline.style.margin = "5px"
        headline.style.padding = "5px 30px"
        headline.style.borderRadius = "20% / 50%"
        headline.style.width = "fit-content"
        return headline
    }

    static #innerContainer = () => {
        const innerContainer = document.createElement("div")

        innerContainer.style.display = "flex"
        innerContainer.style.justifyContent = "center"
        innerContainer.style.flexFlow = "wrap"
        innerContainer.style.margin = "5px"
        innerContainer.style.padding = "5px"
        return innerContainer
    }

    static #textToDecryptContainer = () => {
        const textToDecryptContainer = new TextAreaContainer("暗号文")

        textToDecryptContainer.container.style.border = "5px solid #7dd"
        textToDecryptContainer.headline.style.color = "#4aa"
        return textToDecryptContainer
    }

    static #decryptedCommunicationKeyContainer = () => {
        const decryptedCommunicationKeyContainer = new TextContainer("復号化された通信鍵")

        return decryptedCommunicationKeyContainer
    }

    static #decryptedTextContainer = () => {
        const decryptedTextContainer = new TextAreaContainer("復号化された文")

        return decryptedTextContainer
    }

    getContainer = () => {
        return this.container
    }

    decyptedCommunicationKeyValue() {
        return this.decryptedCommunicationKeyContainer.getInputValue()
    }

    textToDecryptValue() {
        return this.textToDecryptContainer.getInputValue()
    }

    decryptedTextValue() {
        return this.decryptedTextContainer.getInputValue()
    }

    setDecryptedCommunicationKey(decryptedCommunicationKey) {
        this.decryptedCommunicationKeyContainer.setInputValue(decryptedCommunicationKey)
    }

    setDecryptedText(decryptedText) {
        this.decryptedTextContainer.setInputValue(decryptedText)
    }

    setCautionTextToDecrypt(message) {
        this.textToDecryptContainer.setCautionMessage(message)
    }
}
export { EncryptContainer, DecryptContainer }