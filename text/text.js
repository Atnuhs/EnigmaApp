class Text {
    #value;

    constructor(textString) {
        this.#value = textString;
        this.#checkValidation();
    }

    static generateIgnoringInvalidCharacters(stringThatMayContainInvalidCharacters) {
        return new Text(
            stringThatMayContainInvalidCharacters
                .toLowerCase()
                .split("")
                .filter((char) => this.isValid(char))
                .join("")
        );
    }

    #checkValidation() {
        if (!Text.isValid(this.#value)) {
            throw TypeError("文字は小文字アルファベットでなければならない");
        }
    }

    static isValid = (textString) => {
        const pattern = /^[a-z]*$/;
        return pattern.test(textString);
    };

    toString() {
        return this.#value;
    }

    toArray() {
        return this.#value.split("");
    }
}

export { Text };
