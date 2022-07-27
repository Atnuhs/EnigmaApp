import * as enigma from "../domain/enigma.js";
import { scramblerPreset } from "../domain/scramblerPreset.js";
import { CommunicationKey } from "../domain/communicationKey.js"
import { CipherSentence, CipherCommunicatonKey, CipherText } from "../domain/cipherSentence.js"

class DecryptService {
    constructor(dailyKey) {
        const rotors = []
        for (let i = 0; i < dailyKey.numRotor; i++) {
            rotors.push(new enigma.Rotor(scramblerPreset[dailyKey.rotorsPresetOrder[i]]))
            rotors[i].setAngle(dailyKey.rotorAngles[i])
        }
        const plugBoard = new enigma.PlugBoard(scramblerPreset[dailyKey.plugBoardScramblerPreset]);
        const reflector = new enigma.Reflector();
        this.enigma = new enigma.Enigma(plugBoard, rotors, reflector);
        this.dailyKey = dailyKey
        this.keyPattern = /^[a-z]$/;
    };

    setDailyKey() {
        this.enigma.resetRotorAngles(this.dailyKey.rotorAngles)
    }

    async decryptCommunicationKey(cipherCommunicationKey) {
        this.setDailyKey()
        const communicationKey = await CommunicationKey.init(
            cipherCommunicationKey
                .toArray()
                .map(char => this.enigma.typeKey(char))
                .join("")
        )
        this.enigma.resetRotorAngles(communicationKey.rotorAngles())
        return communicationKey.toString()
    }

    decryptText(cipherText) {
        return cipherText
            .toArray()
            .map(char => this.enigma.typeKey(char))
            .join("")
    }

    async decrypt(cipherSentencestr) {
        const [cipherCommunicationKey, cipherText]
            = await CipherSentence.splitCipherCommunicationKeyAndCipherText(cipherSentencestr)
        const communicationKey = await this.decryptCommunicationKey(cipherCommunicationKey)
        const text = this.decryptText(cipherText)
        return {
            "communicationKey": communicationKey,
            "text": text
        }
    }
}

export { DecryptService }