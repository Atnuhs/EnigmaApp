class CipherSentence {
    constructor(cipherSentencestr) {
        this.str = cipherSentencestr
        this.keyPattern = /^[a-z]$/
        this.checkValidation()
    }

    checkValidation() {
        [this.cipherCommunicationKey, this.cipherText] = this.splitCommunicationKeyAndCipherText()
        
        if (this.cipherText === undefined) {
            this.cipherText = ""
        }

        if (this.cipherCommunicationKey.length != 6) {
            throw new TypeError("cipher sentence is invalid")
        }

        if (!this.cipherCommunicationKeyAsArray().every(char => this.keyPattern.test(char))) {
            throw new TypeError("Cipher communication key shoud be lower-case alphabet")
        }

        if (!this.cipherTextAsArray().every(char => this.keyPattern.test(char))) {
            throw new TypeError("Cipher text shoud be lower-case alphabet")
        }

    }

    splitCommunicationKeyAndCipherText() {
        return this.str.split(" ")
    }

    cipherCommunicationKeyAsArray() {
        return this.cipherCommunicationKey.split("")
    }

    cipherTextAsArray() {
        return this.cipherText.split("")
    }

}

export { CipherSentence }