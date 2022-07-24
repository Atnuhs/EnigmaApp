import * as enigma from "./domain/enigma.js";
import { generateDailyKey } from "./service/dailyKeyService.js";
import { EncryptService } from "./service/encryptService.js";
import { TextEncryptionDecryptionAreaViwer } from "./viwer/textEncryptionDecryptionAreaViwer.js";
import { scramblerPreset } from "./domain/scramblerPreset.js";







window.onload = () => {
    const textEncryptionDecryptionAreaViwer = new TextEncryptionDecryptionAreaViwer()
    document.body.appendChild(textEncryptionDecryptionAreaViwer.container)
};
