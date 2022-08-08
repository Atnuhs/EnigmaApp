import { Text } from "../text/text.js";

class EncryptTextService {
    encrypt(inputText, enigma) {
        const text = Text.generateIgnoringInvalidCharacters(inputText);
        return enigma.typeText(text.toString());
    }
}

export { EncryptTextService };
