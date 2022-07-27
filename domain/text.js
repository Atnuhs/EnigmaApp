class Char {
    static init = async (charString) => {
        try {
            await this.checkValidation(charString)
            const ret = new Char()
            ret.value = charString
            return ret
        } catch (error) {
            throw error
        }
    }

    static pattern = /^[a-z]?$/;

    static checkValidation = async (charString) => {
        if (!this.pattern.test(charString)) {
            throw TypeError("charStringは小文字のアルファベットでなければならない")
        }
    }

    toString() {
        return this.value
    }
}

class Text {
    static init = async (textString) => {
        this.checkValidation(textString)
        const ret = new Text()
        try {
            ret.chars = await Promise.all(textString
                .split("")
                .map(async (charString) => { return Char.init(charString) }))
            return ret
        } catch (error) {
            throw error
        }
    }

    static checkValidation = async (textString) => {
        if (!textString instanceof String) {
            throw TypeError("textStringはstringでなければならない")
        }
    }

    toString() {
        return this.toArray().join("")
    }

    toArray() {
        return this.chars.map(char => char.toString())
    }
}


export { Text }