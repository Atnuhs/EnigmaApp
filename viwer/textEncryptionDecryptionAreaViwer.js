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
            try {
                this.encryptContainer.setEncryptedText(
                    this.encryptScenario.encrypt(inputText, inputCommunicationKey)
                )
            } catch (error) {
                if (error instanceof TypeError) {
                    this.encryptContainer.encryptedTextContainer.setInputValue(error.message)
                }
                console.error(error)
            }
        }
    }

    eventDecrypt() {
        return async () => {
            const textToDecrypt = this.decryptContainer.textToDecryptValue()
            try {
                const [communicationKey, text] = this.decryptScenario.decrypt(textToDecrypt)
                this.decryptContainer.setDecryptedCommunicationKey(communicationKey)
                this.decryptContainer.setDecryptedText(text)
            } catch (error) {
                if (error instanceof TypeError) {
                    this.decryptContainer.decryptedTextContainer.setInputValue(error.message)
                }
                console.error(error)
            }
        }
    }
}


export { TextEncryptionDecryptionAreaViwer };