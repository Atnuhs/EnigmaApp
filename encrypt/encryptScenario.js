import { EnigmaFactory } from "../enigma/enigmaFactory.js"
import { DailyKeyService } from "../dailyKey/dailyKeyService.js"
import { EncryptCommunicationKeyService } from "./encryptCommunicationKeyService.js"
import { EncryptTextService } from "./encryptTextService.js"

class EncryptScenario {
    #dailyKeyService
    #encryptCommunicationKeyService
    #encryptTextService
    #enigmaFactory
    constructor() {
        this.#dailyKeyService = new DailyKeyService()
        this.#encryptCommunicationKeyService = new EncryptCommunicationKeyService()
        this.#encryptTextService = new EncryptTextService()
        this.#enigmaFactory = new EnigmaFactory()
    };


    encrypt(inputText, inputCommunicationKey) {
        try {
            // 1. Generate today's daily key for initialize enigma
            const dailyKey = this.#dailyKeyService.generateDailyKey()

            // 2. Generate preconfigured enigma 
            const preconfiguredEnigma = this.#enigmaFactory.enigmaInitializedWithDailyKey(dailyKey)

            // 3. Encrypt communication key
            const [cipherCommunicationKey, enigma]
                = this.#encryptCommunicationKeyService.encrypt(inputCommunicationKey, preconfiguredEnigma)

            // 4. Encrypt text
            const cipherText = this.#encryptTextService.encrypt(inputText, enigma)

            return `${cipherCommunicationKey} ${cipherText}`
        } catch (error) {
            console.error(error)
            return `${error.message}`
        }
    }
}

export { EncryptScenario }
