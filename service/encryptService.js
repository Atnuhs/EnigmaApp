import * as enigma from "../domain/enigma.js";
import { scramblerPreset } from "../domain/scramblerPreset.js";
import { CommunicationKey } from "../domain/communicationKey.js"


class EncryptService {
    constructor(dailyKey) {
        const rotors = [];
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

    setCommunicationKey(communicationKey) {
        this.setDailyKey()
        const ret = communicationKey.toArray()
            .map(char => this.enigma.typeKey(char))
            .join("")
        this.enigma.resetRotorAngles(communicationKey.rotorAngles())
        return ret
    }

    setDailyKey() {
        this.enigma.resetRotorAngles(this.dailyKey.rotorAngles)
    }

    async encrypt(lowerText, communicationKeyStr) {
        try {
            const communicationKey = await CommunicationKey.init(communicationKeyStr)
            const encryptedCommunicationKey = this.setCommunicationKey(communicationKey)
            const ret = lowerText.split("")
                .filter(char => this.keyPattern.test(char))
                .map(char => this.enigma.typeKey(char))
                .join("")
            return `${encryptedCommunicationKey} ${ret}`
        } catch (error) {
            return error
        }
    }
}

export { EncryptService }
