import { EnigmaFactory } from "../enigma/enigmaFactory.js"
import { DailyKeyService } from "../dailyKey/dailyKeyService.js"
import { DecryptCommunicationKeyService } from "./decryptCommunicationKeyService.js"
import { DecryptTextService } from "./decryptTextService.js"

class DecryptScenario {
    #dailyKeyService
    #decryptCommunicationKeyService
    #decryptTextService
    #enigmaFactory
    constructor() {
        this.#dailyKeyService = new DailyKeyService()
        this.#decryptCommunicationKeyService = new DecryptCommunicationKeyService()
        this.#decryptTextService = new DecryptTextService()
        this.#enigmaFactory = new EnigmaFactory()
    };


    #divTextToDecrypt(textToDecrypt) {
        const pattern = /^([a-z]{6}) ([a-z]*)$/
        const result = pattern.exec(textToDecrypt)
        return [
            result[1],
            result[2]
        ]
    }


    decrypt(textToDecrypt) {
        try {
            // 1. div textToDecrypt into cipher communicaion key and cipher text
            const [
                inputCipherCommunicationKey,
                inputCipherText
            ] = this.#divTextToDecrypt(textToDecrypt)
            console.log(inputCipherCommunicationKey)
            console.log(inputCipherText)

            // 1. Generate today's daily key for initialize enigma
            const dailyKey = this.#dailyKeyService.generateDailyKey()

            // 2. Generate preconfigured enigma 
            const preconfiguredEnigma = this.#enigmaFactory.enigmaInitializedWithDailyKey(dailyKey)

            // 3. decrypt communication key
            const [communicationKey, enigma]
                = this.#decryptCommunicationKeyService.decrypt(inputCipherCommunicationKey, preconfiguredEnigma)

            // 4. decrypt text
            const text = this.#decryptTextService.decrypt(inputCipherText, enigma)

            return [
                communicationKey,
                text
            ]
        } catch (error) {
            console.error(error)
            return ["", `${error.message}`]
        }
    }
}

export { DecryptScenario }
