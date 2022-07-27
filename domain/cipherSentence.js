import { CommunicationKey } from "./communicationKey.js"
import { Text } from "./text.js"
class CipherCommunicatonKey {
    static init = async (text) => {
        this.checkValidation(text)
        const ret = new CipherCommunicatonKey()
        ret.text = await Text.init(text)
        return ret
    }
    static checkValidation = async (text) => {
        if (!text instanceof String) {
            throw TypeError("CipherCommunicationKeyコンストラクタの引数はstring型でなければならない")
        }
        if (text.length != 6) {
            throw TypeError("CipherCommunicationKeyコンストラクタの引数は6文字の文字列でなければならない")
        }
    }

    toString() {
        return this.text.toString()
    }

    toArray() {
        return this.text.toArray()
    }
}

class CipherText {
    static init = async (text) => {
        const ret = new CipherText()
        ret.text = await Text.init(text)
        return ret
    }

    toString() {
        return this.text.toString()
    }

    toArray() {
        return this.text.toArray()
    }
}

class CipherSentence {
    static splitCipherCommunicationKeyAndCipherText = async (cipherSentenceStr) => {
        return this.checkValidation(cipherSentenceStr)
    }

    static reg = /^([a-z]{6}) ?([a-z]*)$/

    static checkValidation = async (cipherSentenceStr) => {
        if (!cipherSentenceStr instanceof String) {
            throw TypeError("cipherSentenceコンストラクタの引数はstring型でなければならない")
        }

        const match = this.reg.exec(cipherSentenceStr)

        if (match === null) {
            throw TypeError("cipherSentenceコンストラクタの引数は先頭に6文字の小文字アルファベットが来なければならない")
        }

        const cipherCommunicationKeyStr = match[1]
        const cipherTextStr = match[2]
        const cipherCommunicationKey = CipherCommunicatonKey.init(cipherCommunicationKeyStr)
        const cipherText = CipherText.init(cipherTextStr)
        return Promise.all([cipherCommunicationKey, cipherText])
    }
}

export { CipherSentence, CipherText, CipherCommunicatonKey}