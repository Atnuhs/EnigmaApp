import { EncryptContainer, DecryptContainer } from "./inputElement.js";
import { HeaderContainer } from "./header.js";
import { Details } from "./details.js";
import { EncryptScenario } from "../encrypt/encryptScenario.js";
import { DecryptScenario } from "../decrypt/decryptScenario.js";

class TextEncryptionDecryptionAreaViwer {
    constructor() {
        document.body.style.fontSize = "62.5%"
        this.container = TextEncryptionDecryptionAreaViwer.#container()
        this.encryptContainer = new EncryptContainer()
        this.decryptContainer = new DecryptContainer()

        this.container.appendChild(HeaderContainer.headerContainer())
        this.container.appendChild(Details.details())
        this.container.appendChild(this.encryptContainer.getContainer())
        this.container.appendChild(this.decryptContainer.getContainer())

        this.encryptScenario = new EncryptScenario()
        this.decryptScenario = new DecryptScenario()

        this.encryptContainer.communicationKeyContainer.input.addEventListener("input", this.eventEncrypt());
        this.encryptContainer.textToEncryptContainer.textArea.addEventListener("input", this.eventEncrypt());
        this.decryptContainer.textToDecryptContainer.textArea.addEventListener("input", this.eventDecrypt());
    }

    static #container = () => {
        const container = document.createElement("div")

        container.style.margin = "auto"
        container.style.position = "relative"
        container.style.backgroundColor = "#eee"
        container.style.color = "#343"
        container.style.fontFamily = "Sawarabi Gothic"
        container.style.fontSize = "26px"
        container.style.width = "80%"
        container.style.maxWidth = "1000px"
        return container
    }

    eventEncrypt() {
        return () => {
            const inputText = this.encryptContainer.textToEncryptValue();
            const inputCommunicationKey = this.encryptContainer.communicationKeyValue()
            const [encryptedText, messageCommunicationKeyArea, messageTextArea]
                = this.encryptScenario.encrypt(inputText, inputCommunicationKey)
            this.encryptContainer.setCautionCommunicationKey(messageCommunicationKeyArea)
            this.encryptContainer.setCautionTextToEncrypt(messageTextArea)
            this.encryptContainer.setEncryptedText(encryptedText)
        }
    }

    eventDecrypt() {
        return async () => {
            const textToDecrypt = this.decryptContainer.textToDecryptValue()
            const [communicationKey, text, messageTextToDecrypt]
                = this.decryptScenario.decrypt(textToDecrypt)
            this.decryptContainer.setCautionTextToDecrypt(messageTextToDecrypt)
            this.decryptContainer.setDecryptedCommunicationKey(communicationKey)
            this.decryptContainer.setDecryptedText(text)
        }
    }
}


export { TextEncryptionDecryptionAreaViwer };