import { Text } from "./text.js"

class CipherText {
    #value
    constructor(cipherText) {
        this.#value = new Text(cipherText)
    }

    toString() {
        return this.#value.toString()
    }
}
export { CipherText }