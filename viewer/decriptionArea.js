import { EncryptScenario } from "../encrypt/encryptScenario.js";
import { Details } from "./details.js";
import { HeaderContainer } from "./header.js";
import { DecryptContainer, EncryptContainer } from "./inputElement.js";
import { Tab, TabBar } from "./tabBar.js";

class TextEncryptionDecryptionAreaViwer {
    constructor() {
        this.container = TextEncryptionDecryptionAreaViwer.#container();
        this.encryptContainer = new EncryptContainer();
        this.decryptContainer = new DecryptContainer();
        this.encryptTab = new Tab("#cfc", "暗号化", this.eventTapEncryptTab());
        this.decryptTab = new Tab("#ccf", "復号化", this.eventTabDecryptTab());

        this.decryptContainer.getContainer().style.display = "none"

        this.container.appendChild(HeaderContainer.headerContainer());
        this.container.appendChild(Details.details());
        this.container.appendChild(TabBar.tabBarContainer([this.encryptTab, this.decryptTab]));
        this.container.appendChild(this.encryptContainer.getContainer());
        this.container.appendChild(this.decryptContainer.getContainer());

        this.encryptScenario = new EncryptScenario();
        this.decryptScenario = new DecryptScenario();

        this.encryptContainer.communicationKeyContainer.input.addEventListener("input", this.eventEncrypt());
        this.encryptContainer.textToEncryptContainer.textArea.addEventListener("input", this.eventEncrypt());
        this.decryptContainer.textToDecryptContainer.textArea.addEventListener("input", this.eventDecrypt());
    }


    eventEncrypt() {
        return () => {
            const inputText = this.encryptContainer.textToEncryptValue();
            const inputCommunicationKey = this.encryptContainer.communicationKeyValue();
            const [encryptedText, messageCommunicationKeyArea, messageTextArea] = this.encryptScenario.encrypt(inputText, inputCommunicationKey);
            this.encryptContainer.setCautionCommunicationKey(messageCommunicationKeyArea);
            this.encryptContainer.setCautionTextToEncrypt(messageTextArea);
            this.encryptContainer.setEncryptedText(encryptedText);
        };
    }

    eventDecrypt() {
        return () => {
            const textToDecrypt = this.decryptContainer.textToDecryptValue();
            const [communicationKey, text, messageTextToDecrypt] = this.decryptScenario.decrypt(textToDecrypt);
            this.decryptContainer.setCautionTextToDecrypt(messageTextToDecrypt);
            this.decryptContainer.setDecryptedCommunicationKey(communicationKey);
            this.decryptContainer.setDecryptedText(text);
        };
    }

    eventTapEncryptTab() {
        return () => {
            this.encryptContainer.display();
            this.encryptTab.tab.backgroundColor = "#cfc"
            this.decryptContainer.displayNone();
            this.decryptTab.tab.backgroundColor = "#446"
        };
    }

    eventTabDecryptTab() {
        return () => {
            this.decryptContainer.display();
            this.decryptTab.tab.backgroundColor = "#464"
            this.encryptContainer.displayNone();
            this.encryptTab.tab.backgroundColor = "#ccf"
        };
    }
}

export { TextEncryptionDecryptionAreaViwer };
