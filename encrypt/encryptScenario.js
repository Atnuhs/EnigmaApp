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

        if (inputCommunicationKey === "") { return ["","",""]}

        let dailyKey, preconfiguredEnigma

        try {
            // 1. Generate today's daily key for initialize enigma
            dailyKey = this.#dailyKeyService.generateDailyKey()

            // 2. Generate preconfigured enigma 
            preconfiguredEnigma = this.#enigmaFactory.enigmaInitializedWithDailyKey(dailyKey)

        } catch (error) {
            return ["", "日替わり鍵でエニグマを初期化するときのエラー", ""]
        }

        let cipherCommunicationKey, enigma

        try {
            // 3. Encrypt communication key
            [cipherCommunicationKey, enigma]
                = this.#encryptCommunicationKeyService.encrypt(inputCommunicationKey, preconfiguredEnigma)
        } catch (error) {
            return ["", error.message, ""]
        }

        let cipherText

        try {
            // 4. Encrypt text
            cipherText = this.#encryptTextService.encrypt(inputText, enigma)
        } catch (error) {
            return ["", "", error.message]
        }

        return [`${cipherCommunicationKey} ${cipherText}`, "", ""]
    }
}

export { EncryptScenario }
