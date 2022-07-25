import { KeyIndexConverter } from "./enigma.js"

class CommunicationKey {
    constructor(communicationKeyStr) {

        this.str = communicationKeyStr
        this.keyPattern = /^[a-z]$/
        this.checkValidation()
    }

    checkValidation() {
        if (this.str === undefined) {
            throw new TypeError("Communication key should be defined")
        }

        if (this.str.length != 6) {
            throw new TypeError("Communication key length should be 6")
        }

        if (!this.asArray().every(char => this.keyPattern.test(char))) {
            throw new TypeError("Communication key shoud be lower-case alphabet")
        }

        if (this.str.substring(0, 3) != this.str.substring(3, 6)) {
            throw new TypeError("Communication key characters 1-3 and 4-6 must be equal")
        }
    }

    rotorsAngle() {
        return this.str.slice(0, 3).split("").map(x => KeyIndexConverter.keyToIndex(x))
    }
    
    asArray() {
        return this.str.split("")
    }
}


export { CommunicationKey }