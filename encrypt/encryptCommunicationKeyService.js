import { CommunicationKey } from "../text/communicationKey.js"
import { Enigma } from "../enigma/enigma.js"

class EncryptCommunicationKeyService {
    encrypt(inputCommunicationKey, preconfiguredEnigma) {
        const communicationKey = new CommunicationKey(inputCommunicationKey)
        const cipherCommunicationKeyStr
            = preconfiguredEnigma.typeText(communicationKey.toString())
        const enigma = preconfiguredEnigma.resetRotorsAngle(communicationKey.rotorsAngle())
        return [cipherCommunicationKeyStr, enigma]
    }
}

export { EncryptCommunicationKeyService }