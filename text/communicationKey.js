import { KeyIndexConverter } from "../enigma/enigma.js"
import { Text } from "./text.js"

class CommunicationKey {
    #value
    constructor(communicationKeyStr) {
        this.#value = new Text(communicationKeyStr)
        this.#checkValidation()
    }

    #checkValidation() {
        if (this.toString().length != 6) {
            throw new TypeError("秘密鍵は6文字でなければならない")
        }

        if (this.toString().substring(0, 3) != this.toString().substring(3, 6)) {
            throw new TypeError("秘密鍵は1-3文字目の部分文字列と4-6文字目の部分文字列が等しくなければならない")
        }
    }

    rotorsAngle() {
        return this.#value
            .toArray()
            .slice(0, 3)
            .map(x => KeyIndexConverter.keyToIndex(x))
    }

    toString() {
        return this.#value.toString()
    }
}


export { CommunicationKey }