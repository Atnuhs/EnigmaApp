import { TextEncryptionDecryptionAreaViwer } from "./viwer/textEncryptionDecryptionAreaViwer.js";

window.onload = () => {
    document.body.style.fontSize = "62.5%";
    const textEncryptionDecryptionAreaViwer = new TextEncryptionDecryptionAreaViwer();
    document.body.appendChild(textEncryptionDecryptionAreaViwer.container);
};
