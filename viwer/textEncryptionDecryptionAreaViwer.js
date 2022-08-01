import { generateDailyKey } from "../service/dailyKeyService.js";
import { EncryptService } from "../service/encryptService.js";
import { DecryptService } from "../service/decryptService.js";
import { EncryptContainer, DecryptContainer} from "./inputElement.js";
import { HeaderContainer } from "./header.js";
import { Details } from "./details.js";

class TextEncryptionDecryptionAreaViwer {
    constructor() {
        document.body.style.fontSize = "62.5%"
        this.container = document.createElement("div")
        this.encryptContainer = new EncryptContainer()
        this.decryptContainer = new DecryptContainer()
        this.container.appendChild(HeaderContainer.headerContainer())
        this.container.appendChild(Details.details())
        this.container.appendChild(this.encryptContainer.container)
        this.container.appendChild(this.decryptContainer.container)

        this.dailyKey = generateDailyKey()
        this.encryptService = new EncryptService(this.dailyKey)
        this.decryptService = new DecryptService(this.dailyKey)

        this.container.style.margin = "auto"
        this.container.style.position = "relative"
        this.container.style.backgroundColor = "#eee"
        this.container.style.color = "#343"
        this.container.style.fontFamily = "Sawarabi Gothic"
        this.container.style.fontSize = "26px"
        this.container.style.width = "80%"
        this.container.style.maxWidth = "1000px"

        this.encryptContainer.communicationKeyContainer.input.addEventListener("input", this.eventEncrypt());
        this.encryptContainer.textToEncryptContainer.input.addEventListener("input", this.eventEncrypt());
        this.decryptContainer.textToDecryptContainer.input.addEventListener("input", this.eventDecrypt());
    }

    eventEncrypt() {
        return async () => {
            const lowerText = this.encryptContainer.textToEncryptValue().toLowerCase();
            const communicationKey = this.encryptContainer.communicationKeyValue()
            try {
                this.encryptContainer.encryptedTextContainer.input.value = await this.encryptService.encrypt(lowerText, communicationKey)
            } catch (error) {
                if (error instanceof TypeError) {
                    this.encryptContainer.encryptedTextContainer.input.value = error.message
                }
                console.error(error)
            }
        }
    }

    eventDecrypt() {
        return async () => {
            const cipherSentence = this.decryptContainer.textToDecryptValue()
            try {
                const decryptedData = await this.decryptService.decrypt(cipherSentence)
                this.decryptContainer.decryptedCommunicationKeyContainer.input.value = decryptedData.communicationKey
                this.decryptContainer.decryptedTextContainer.input.value = decryptedData.text
            } catch (error) {
                if (error instanceof TypeError) {
                    this.decryptContainer.decryptedTextContainer.input.value = error.message
                }
                console.error(error)
            }
        }
    }
}


export { TextEncryptionDecryptionAreaViwer };