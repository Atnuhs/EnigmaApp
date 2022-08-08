import { Enigma, PlugBoard, Reflector, Rotor } from "./enigma.js";
import { scramblerPreset } from "./scramblerPreset.js";

class EnigmaFactory {
    #generateRotors(dailyKey) {
        return dailyKey.rotorsSetting().map((setting) => {
            const scrambler = scramblerPreset[setting.presetOrder];
            const rotor = new Rotor(scrambler, setting.angle);
            return rotor;
        });
    }

    enigmaInitializedWithDailyKey(dailyKey) {
        const rotors = this.#generateRotors(dailyKey);
        const plugBoard = new PlugBoard(scramblerPreset[dailyKey.plugBoardScramblerPreset()]);
        const reflector = new Reflector();
        return new Enigma(plugBoard, rotors, reflector);
    }

    enigmaInitializedWithCommunicationKey(communicationKey, enigma) {
        return enigma.resetRotorsAngle(communicationKey.RotorsAngle());
    }
}

export { EnigmaFactory };
