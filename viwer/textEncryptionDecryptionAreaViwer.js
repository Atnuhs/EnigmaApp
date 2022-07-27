import { generateDailyKey } from "../service/dailyKeyService.js";
import { EncryptService } from "../service/encryptService.js";
import { DecryptService } from "../service/decryptService.js";
import { CommunicationKey } from "../domain/communicationKey.js";

class TextEncryptionDecryptionAreaViwer {
    constructor() {
        this.container = document.createElement("div")
        this.container.appendChild(this.header())
        this.container.appendChild(this.details())
        this.container.appendChild(this.generateEncryptionDiv())
        this.container.appendChild(this.generateDecryptionDiv())
        this.dailyKey = generateDailyKey()
        this.encryptService = new EncryptService(this.dailyKey)
        this.decryptService = new DecryptService(this.dailyKey)

        this.container.style.margin = "auto"
        this.container.style.backgroundColor = "#aee"
        this.container.style.color = "#433"
        this.container.style.fontFamily = "Sawarabi Gothic"
        this.container.style.fontSize = "26px"
        this.container.style.maxWidth = "80%"

        this.textToBeEncryptedArea.addEventListener("input", this.eventEncrypt);
        this.communicationKeyArea.addEventListener("input", this.eventEncrypt);
        this.textToBeDecryptedArea.addEventListener("input",this.eventDecrypt);
    }

    async eventEncrypt() {
        const lowerText = this.textToBeEncryptedToLower();
        const communicationKey = this.communicationKeyArea.value
        try {
            this.generatedCipherTextArea.value = await this.encryptService.encrypt(lowerText, communicationKey)
        } catch (error) {
            if (error instanceof TypeError) {
                this.generatedCipherTextArea.value = error.message
                console.error(error)
            }
        }
    }

    async eventDecrypt() {
        const cipherSentence = this.textToBeDecryptedArea.value
        try {
            const decryptedData = await this.decryptService.decrypt(cipherSentence)
            this.generatedDecryptedCommunicationKeyArea.value = decryptedData.communicationKey
            this.generatedDecryptedTextArea.value = decryptedData.text
        } catch (error) {
            if (error instanceof TypeError) {
                this.generatedDecryptedTextArea.value = error.message
                console.error(error)
            }
        }
    }


    header() {
        const container = document.createElement("div")
        const title = document.createElement("h1")
        container.appendChild(title)
        title.innerText = "エニグマ暗号化/復号化アプリ ver0.2"
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
        describe.style.fontSize = "1rem"


        describe.innerText =
            `暗号化: 通信鍵と暗号化したい文章を入力すると、暗号化された文章が出てきます。
            通信鍵によってEnigmaの中身がscrambleされるため、同じ文章でも異なる通信鍵を用いることで、異なる暗号文が生成されます
            復号化: 暗号化された文章を貼り付けることで通信鍵と文章の復号化を行います。
            自分で作成した暗号文をコピペして復号化のチェックを行ったり、他人から送られた暗号文をコピペすることで元の文章の復号化が行えます。
            暗号化/復号化に共通して、通信鍵の形式が不正だと正しくEnigmaが動作しませんのでご注意ください
            
            通信鍵: 3文字の小文字アルファベットを2回繰り返した、計6文字の文字列。
            例) psvpsv => OK!, 例) aaaaaa => OK!, 例) aabaab => OK!
            例) psps => NG! (6文字でないため) 
            例) abbbba => NG! (繰り返しの形になっていないため)
            例) PSVPSV => NG! (大文字アルファベットは使用できません)`

        return container
    }



    wrapHeadline(dom, headlineMessage) {
        const container = document.createElement("div")
        const headline = document.createElement("p")
        headline.innerText = headlineMessage
        container.appendChild(headline)
        container.appendChild(dom)
        container.style.margin = "5px"
        container.style.padding = "10px"
        container.style.alignItems = "center"
        container.style.backgroundColor = "#eee"
        return container
    }

    generateFormatedTextArea() {
        const ret = document.createElement("textarea")
        ret.spellcheck = false
        ret.rows = 8
        ret.cols = 40
        return ret
    }

    generateEncryptionDiv() {
        const container = document.createElement("div")
        const headline = document.createElement("p")
        this.communicationKeyArea = document.createElement("input")
        this.textToBeEncryptedArea = this.generateFormatedTextArea()
        this.generatedCipherTextArea = this.generateFormatedTextArea()

        headline.innerHTML = "暗号化"
        headline.style.margin = "5px"
        headline.style.padding = "10px"
        container.style.display = "flex"
        container.style.justifyContent = "right"
        container.style.flexFlow = "row"
        container.style.flexWrap = "wrap"
        container.style.backgroundColor = "#aaa"
        container.style.margin = "5px"

        this.communicationKeyArea.maxLength = 6
        this.communicationKeyArea.placeholder = "psvpsv"
        this.communicationKeyArea.pattern = /([a-z]{3}){6}/
        container.appendChild(headline)
        container.appendChild(this.wrapHeadline(this.communicationKeyArea, "通信鍵(\"psvpsv\"のような\n3文字のアルファベットの繰り返し)"))
        container.appendChild(this.wrapHeadline(this.textToBeEncryptedArea, "暗号化したい文章"))
        container.appendChild(this.wrapHeadline(this.generatedCipherTextArea, "暗号化された文章"))
        return container
    }
    generateDecryptionDiv() {
        const container = document.createElement("div")
        const headline = document.createElement("p")
        this.textToBeDecryptedArea = this.generateFormatedTextArea()
        this.generatedDecryptedCommunicationKeyArea = document.createElement("input")
        this.generatedDecryptedTextArea = this.generateFormatedTextArea()

        headline.innerHTML = "復号化"
        headline.style.margin = "5px"
        headline.style.padding = "10px"
        container.style.display = "flex"
        container.style.justifyContent = "right"
        container.style.flexFlow = "row"
        container.style.flexWrap = "wrap"
        container.style.backgroundColor = "#aaa"
        container.style.margin = "5px"
        container.appendChild(headline)
        container.appendChild(this.wrapHeadline(this.textToBeDecryptedArea, "復号化したい文章"))
        container.appendChild(this.wrapHeadline(this.generatedDecryptedCommunicationKeyArea, "復号化された通信鍵"))
        container.appendChild(this.wrapHeadline(this.generatedDecryptedTextArea, "復号化された文章"))
        return container
    }

    textToBeEncryptedToLower() {
        return this.textToBeEncryptedArea.value.toLowerCase()
    }







}


export { TextEncryptionDecryptionAreaViwer };