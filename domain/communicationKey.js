import { KeyIndexConverter } from "./enigma.js"
import { Text } from "./text.js"

class CommunicationKey {
    static init = async (communicationKeyStr) => {
        try {
            const ret = new CommunicationKey()
            await this.checkValidation(communicationKeyStr)
            ret.text = await Text.init(communicationKeyStr)
            return ret
        } catch (error) {
            throw error
        }
    }

    static checkValidation = async (communicationKeyStr) => {
        if (!communicationKeyStr instanceof String) {
            throw new TypeError("CommunicationKeyコンストラクタの引数は文字列でなければならない")
        }

        if (communicationKeyStr.length != 6) {
            throw new TypeError("CommunicationKeyコンストラクタの引数は6文字でなければならない")
        }

        if (communicationKeyStr.substring(0, 3) != communicationKeyStr.substring(3, 6)) {
            throw new TypeError("CommunicationKeyコンストラクタの引数は1-3文字目の部分文字列と4-6文字目の部分文字列が等しくなければならない")
        }
    }

    rotorAngles() {
        return this.text.toArray()
            .slice(0, 3)
            .map(x => KeyIndexConverter.keyToIndex(x))
    }

    toArray() {
        return this.text.toArray()
    }

    toString() {
        return this.text.toString()
    }
}


export { CommunicationKey }