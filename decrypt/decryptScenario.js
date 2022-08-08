import { DailyKeyService } from "../dailyKey/dailyKeyService.js";
import { EnigmaFactory } from "../enigma/enigmaFactory.js";
import { DecryptCommunicationKeyService } from "./decryptCommunicationKeyService.js";
import { DecryptTextService } from "./decryptTextService.js";

class DecryptScenario {
    #dailyKeyService;
    #decryptCommunicationKeyService;
    #decryptTextService;
    #enigmaFactory;
    constructor() {
        this.#dailyKeyService = new DailyKeyService();
        this.#decryptCommunicationKeyService = new DecryptCommunicationKeyService();
        this.#decryptTextService = new DecryptTextService();
        this.#enigmaFactory = new EnigmaFactory();
    }

    #divTextToDecrypt(textToDecrypt) {
        const pattern = /^([a-z]{6}) ([a-z]*)$/;
        const result = pattern.exec(textToDecrypt);
        return [result[1], result[2]];
    }

    decrypt(textToDecrypt) {
        if (textToDecrypt === "") {
            return ["", "", ""];
        }

        let inputCipherCommunicationKey, inputCipherText;

        try {
            // 1. div textToDecrypt into cipher communicaion key and cipher text
            [inputCipherCommunicationKey, inputCipherText] = this.#divTextToDecrypt(textToDecrypt);
        } catch (error) {
            return ["", "", "暗号文の構文エラーです"];
        }

        // 2. Generate today's daily key for initialize enigma
        const dailyKey = this.#dailyKeyService.generateDailyKey();

        // 3. Generate preconfigured enigma
        const preconfiguredEnigma = this.#enigmaFactory.enigmaInitializedWithDailyKey(dailyKey);

        let communicationKey, enigma;
        try {
            // 4. decrypt communication key
            [communicationKey, enigma] = this.#decryptCommunicationKeyService.decrypt(inputCipherCommunicationKey, preconfiguredEnigma);
        } catch (error) {
            return ["", "", "鍵の復号エラー"];
        }

        let text;
        try {
            // 5. decrypt text
            text = this.#decryptTextService.decrypt(inputCipherText, enigma);
        } catch (error) {
            return ["", "", "暗号文の復号時エラー"];
        }
        return [communicationKey, text, ""];
    }
}

export { DecryptScenario };
