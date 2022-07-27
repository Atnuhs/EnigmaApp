
class TextContainer {
    constructor (headlineText) {
        this.container = document.createElement("div")
        this.headline = document.createElement("p")
        this.input = document.createElement("input")
        this.message = document.createElement("p")

        this.container.appendChild(this.headline)
        this.container.appendChild(this.input)
        this.container.appendChild(this.message)

        this.container.style.backgroundColor = "#eee"
        this.container.style.minWidth = "10rem"
        this.container.style.borderRadius = "30% / 15%"
        this.container.style.padding = "8px"
        this.container.style.margin = "auto"

        this.container.style.display = "flex"
        this.container.style.flexDirection = "column"
        this.container.style.alignItems = "center"
        this.container.style.justifyContent = "center"
        
        this.headline.innerText = headlineText

        this.input.style.boxSizing = "border-box"
        this.input.style.width = "100%"
    }
}


class TextAreaContainer {
    constructor (headlineText) {
        this.container = document.createElement("div")
        this.headline = document.createElement("p")
        this.input = document.createElement("textarea")
        this.message = document.createElement("p")

        this.container.appendChild(this.headline)
        this.container.appendChild(this.input)
        this.container.appendChild(this.message)

        this.container.style.backgroundColor = "#eee"
        this.container.style.borderRadius = "30% / 15%"
        this.container.style.padding = "8px"
        this.container.style.margin = "auto"
        this.container.style.justifyContent = "center"
        
        this.container.style.display = "flex"
        this.container.style.flexDirection = "column"
        this.container.style.alignItems = "center"
        this.headline.innerText = headlineText

        this.input.rows = 8
        this.input.cols = 30
    }
}

class EncryptContainer {
    constructor() {
        this.container = document.createElement("div")
        this.headline = document.createElement("p")
        this.innerContainer = document.createElement("div")
        this.communicationKeyContainer = new TextContainer("通信鍵")
        this.textToEncryptContainer = new TextAreaContainer("平文")
        this.encryptedTextContainer = new TextAreaContainer("暗号文")

        this.container.appendChild(this.headline)
        this.container.appendChild(this.innerContainer)
        this.innerContainer.appendChild(this.communicationKeyContainer.container)
        this.innerContainer.appendChild(this.textToEncryptContainer.container)
        this.innerContainer.appendChild(this.encryptedTextContainer.container)

        this.format()
    }

    format() {
        this.container.style.backgroundColor = "#fbb"
        this.container.style.padding = "5px 30px"

        this.headline.innerText = "暗号化"
        this.headline.style.backgroundColor = "hsla(260,100%,70%,0.5)"
        this.headline.style.margin = "5px"
        this.headline.style.padding = "5px 30px"
        this.headline.style.borderRadius = "20% / 50%"

        this.headline.style.width = "fit-content"

        this.innerContainer.style.display = "flex"
        this.innerContainer.style.justifyContent = "center"
        this.innerContainer.style.flexFlow = "wrap"
        this.innerContainer.style.margin = "5px"
        this.innerContainer.style.padding = "5px"
        
        this.communicationKeyContainer.input.maxLength = 6
        this.communicationKeyContainer.input.placeholder = "psvpsv"
        this.communicationKeyContainer.input.pattern = /([a-z]{3}){6}/
        
        this.communicationKeyContainer.container.style.border = "5px solid #7dd"
        this.communicationKeyContainer.headline.style.color = "#4aa"

    }

    communicationKeyValue() {
        return this.communicationKeyContainer.input.value
    }

    textToEncryptValue() {
        return this.textToEncryptContainer.input.value
    }
    
    encryptedTextValue() {
        return this.encryptedTextContainer.input.value
    }
}

class DecryptContainer {
    constructor() {
        this.container = document.createElement("div")
        this.headline = document.createElement("p")
        this.innerContainer = document.createElement("div")
        this.textToDecryptContainer = new TextAreaContainer("暗号文")
        this.decryptedCommunicationKeyContainer = new TextContainer("通信鍵")
        this.decryptedTextContainer = new TextAreaContainer("復号化された文")

        this.container.appendChild(this.headline)
        this.container.appendChild(this.innerContainer)
        this.innerContainer.appendChild(this.textToDecryptContainer.container)
        this.innerContainer.appendChild(this.decryptedCommunicationKeyContainer.container)
        this.innerContainer.appendChild(this.decryptedTextContainer.container)

        this.format()
    }

    format() {
        this.container.style.backgroundColor = "#bfb"
        this.container.style.padding = "5px 30px"

        this.headline.innerText = "復号化"
        this.headline.style.backgroundColor = "hsla(260,100%,70%,0.5)"
        this.headline.style.margin = "5px"
        this.headline.style.padding = "5px 30px"
        this.headline.style.borderRadius = "20% / 50%"
        this.headline.style.width = "fit-content"

        this.innerContainer.style.display = "flex"
        this.innerContainer.style.justifyContent = "center"
        this.innerContainer.style.flexFlow = "wrap"
        this.innerContainer.style.margin = "5px"
        this.innerContainer.style.padding = "5px"


        this.textToDecryptContainer.container.style.border = "5px solid #7dd"
        this.textToDecryptContainer.headline.style.color = "#4aa"
        
        this.decryptedCommunicationKeyContainer.input.maxLength = 6
        this.decryptedCommunicationKeyContainer.input.placeholder = "psvpsv"
        this.decryptedCommunicationKeyContainer.input.pattern = /([a-z]{3}){6}/
    }

    decyptedCommunicationKeyValue() {
        return this.decryptedCommunicationKeyContainer.input.value
    }

    textToDecryptValue() {
        return this.textToDecryptContainer.input.value
    }
    
    decryptedTextValue() {
        return this.decryptedTextContainer.input.value
    }
}
export { EncryptContainer, DecryptContainer }