import { DailyKey } from "./dailyKey.js";

class DailyKeyService {
    #numRotors = 3;
    #rotorsPresetOrder = [0, 1, 2];
    #rotorAngles = [0, 0, 0];
    #plugBoardScramblerPreset = 0;
    generateDailyKey() {
        return new DailyKey(this.#numRotors, this.#rotorsPresetOrder, this.#rotorAngles, this.#plugBoardScramblerPreset);
    }
}

export { DailyKeyService };
