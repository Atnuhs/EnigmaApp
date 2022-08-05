import { Text } from "./text.js"

class CipherCommunicatonKey {
    #value
    constructor(cipherCommunicationKey) {
        this.#value = new Text(cipherCommunicationKey)
        this.#checkValidation()
    }

    #checkValidation() {
        if (this.toString().length != 6) {
            throw TypeError("暗号文の秘密鍵箇所は6文字の文字列でなければならない")
        }
    }

    toString() {
        return this.#value.toString()
    }
}

export { CipherCommunicatonKey }