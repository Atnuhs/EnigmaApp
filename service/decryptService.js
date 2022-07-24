import * as enigma from "../domain/enigma.js";
import { scramblerPreset } from "../domain/scramblerPreset.js";
import { CommunicationKey } from "../domain/communicationKey.js"
import { CipherSentence } from "../domain/cipherSentence.js"

class DecryptService {
    constructor(dailyKey) {
        const rotors = []
        for (let i = 0; i < dailyKey.numRotor; i++) {
            rotors.push(new enigma.Rotor(scramblerPreset[dailyKey.rotorsPresetOrder[i]]))
            rotors[i].setAngle(dailyKey.rotorsAngle[i])
        }
        const plugBoard = new enigma.PlugBoard(scramblerPreset[dailyKey.plugBoardScramblerPreset]);
        const reflector = new enigma.Reflector();
        this.enigma = new enigma.Enigma(plugBoard, rotors, reflector);
        this.dailyKey = dailyKey
        this.keyPattern = /^[a-z]$/;
    };

    setDailyKey() {
        this.enigma.resetRotorAngle(this.dailyKey.rotorsAngle)
    }

    communicationErrorText() {
        return "復号したい文章は、\"6文字の小文字アルファベット + 半角空白 + 任意長の小文字アルファベット\"の形式でなければなりません"
    }

    decryptCommunicationKey(cipherCommunicationKey) {
        this.setDailyKey()
        let ret = []
        for (const char of cipherCommunicationKey.split("")) {
            const encryptedKey = this.enigma.typeKey(char);
            ret.push(encryptedKey)
        }
        const communicationKey = new CommunicationKey(ret.join(""))
        this.enigma.resetRotorAngle(communicationKey.rotorsAngle())
        return communicationKey


    }

    decryptText(cipherText) {
        let ret = []
        for (const char of cipherText.split("")) {
            const encryptedKey = this.enigma.typeKey(char);
            ret.push(encryptedKey)
        }
        return ret.join("")
    }

    decrypt(cipherSentencestr) {
        const cipherSentence = new CipherSentence(cipherSentencestr)
        const [cipherCommunicationKey, cipherText] = cipherSentence.splitCommunicationKeyAndCipherText()
        const communicationKey = this.decryptCommunicationKey(cipherCommunicationKey)
        const decryptedText = this.decryptText(cipherText)

        return {
            "communicationKey": communicationKey,
            "text": decryptedText
        }
    }
}

export { DecryptService }