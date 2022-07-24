import * as enigma from "../domain/enigma.js";
import { scramblerPreset } from "../domain/scramblerPreset.js";
import { CommunicationKey } from "../domain/communicationKey.js"


class EncryptService {
    constructor(dailyKey) {
        const rotors = [];
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

    setCommunicationKey(communicationKey) {
        this.setDailyKey()
        let ret = []
        for (const char of communicationKey.asArray()) {
            if (!this.keyPattern.test(char)) continue;
            const encryptedKey = this.enigma.typeKey(char);
            ret.push(encryptedKey)
        }
        this.enigma.resetRotorAngle(communicationKey.rotorsAngle())
        return ret.join("")
    }


    communicationErrorText() {
        return 
    }

    setDailyKey() {
        this.enigma.resetRotorAngle(this.dailyKey.rotorsAngle)
    }

    encrypt(lowerText, communicationKeystr) {
        const communicationKey = new CommunicationKey(communicationKeystr)
        const encryptedCommunicationKey = this.setCommunicationKey(communicationKey)
        let ret = []
        for (const char of lowerText.split("")) {
            if (!this.keyPattern.test(char)) continue;
            const encryptedKey = this.enigma.typeKey(char);
            ret.push(encryptedKey)
        }
        return `${encryptedCommunicationKey} ${ret.join("")}`
    }
}


export { EncryptService }
