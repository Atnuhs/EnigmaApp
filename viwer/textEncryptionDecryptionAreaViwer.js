import { generateDailyKey } from "../service/dailyKeyService.js";
import { EncryptService } from "../service/encryptService.js";
import { DecryptService } from "../service/decryptService.js";
import { EncryptContainer, DecryptContainer} from "./inputElement.js";
class TextEncryptionDecryptionAreaViwer {
    constructor() {
        document.body.style.fontSize = "62.5%"
        this.container = document.createElement("div")
        this.encryptContainer = new EncryptContainer()
        this.decryptContainer = new DecryptContainer()
        this.container.appendChild(this.header())
        this.container.appendChild(this.details())
        this.container.appendChild(this.encryptContainer.container)
        this.container.appendChild(this.decryptContainer.container)
        this.dailyKey = generateDailyKey()
        this.encryptService = new EncryptService(this.dailyKey)
        this.decryptService = new DecryptService(this.dailyKey)

        this.container.style.margin = "auto"
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

    header() {
        const container = document.createElement("div")
        const title = document.createElement("h1")
        container.appendChild(title)
        title.innerText = "エニグマ暗号化/復号化アプリ ver0.3"
        title.style.fontSize = "3rem"
        return container
    }

    details() {
        const container = document.createElement("div")
        const details = document.createElement("details")
        const summary = document.createElement("summary")
        const describe = document.createElement("p")
        container.appendChild(details)
        details.appendChild(summary)
        details.appendChild(describe)
        details.open = true
        summary.innerText = "説明"
        summary.style.fontSize = "30px"
        summary.style.fontWeight = "bold"
        summary.style.color = "hsla(111, 100%, 40%, 1)"
        describe.style.fontSize = "1rem"
        describe.style.color = "hsla(111, 70%, 35%, 0.8)"


        describe.innerText =
            `暗号化: 通信鍵と暗号化したい文章を入力すると、暗号化された文章が出てきます。
            通信鍵によってEnigmaの中身がscrambleされるため、同じ文章でも異なる通信鍵を用いることで、異なる暗号文が生成されます
            復号化: 暗号化された文章を貼り付けることで通信鍵と文章の復号化を行います。
            自分で作成した暗号文をコピペして復号化のチェックを行ったり、他人から送られた暗号文をコピペすることで元の文章の復号化が行えます。
            暗号化/復号化に共通して、通信鍵の形式が不正だと正しくEnigmaが動作しませんのでご注意ください
            
            通信鍵: 3文字の小文字アルファベットを2回繰り返した、計6文字の文字列。
            例) psvpsv => OK!, 例) aaaaaa => OK!, 例) aabaab => OK!
            例) psps => NG! (6文字でないため) 
            例) psvvsp => NG! (繰り返しの形になっていないため)
            例) PSVPSV => NG! (大文字アルファベットは使用できません)`

        return container
    }
}


export { TextEncryptionDecryptionAreaViwer };