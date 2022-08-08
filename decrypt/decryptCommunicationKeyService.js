import { CipherCommunicatonKey } from "../text/cipherCommunicationKey.js";
import { CommunicationKey } from "../text/communicationKey.js";

class DecryptCommunicationKeyService {
    decrypt(inputCipherCommunicationKey, preconfiguredEnigma) {
        const cipherCommunicationKey = new CipherCommunicatonKey(inputCipherCommunicationKey);
        const communicationKey = new CommunicationKey(preconfiguredEnigma.typeText(cipherCommunicationKey.toString()));
        const enigma = preconfiguredEnigma.resetRotorsAngle(communicationKey.rotorsAngle());
        return [communicationKey.toString(), enigma];
    }
}

export { DecryptCommunicationKeyService };
