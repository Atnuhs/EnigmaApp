import { CipherText } from "../text/cipherText.js"

class DecryptTextService {
    decrypt(inputCipherText, enigma) {
        const cipherText = new CipherText(inputCipherText)
        return enigma.typeText(cipherText.toString())
    }
}

export { DecryptTextService }