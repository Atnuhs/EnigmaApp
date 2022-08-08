import { Detail } from "../detail/detail.js";

class DailyKey {
    #numRotors;
    #rotorsPresetOrder;
    #rotorsAngle;
    #plugBoardScramblerPreset;
    constructor(numRotors, rotorsPresetOrder, rotorsAngle, plugBoardScramblerPreset) {
        this.#numRotors = numRotors;
        this.#rotorsPresetOrder = rotorsPresetOrder;
        this.#rotorsAngle = rotorsAngle;
        this.#plugBoardScramblerPreset = plugBoardScramblerPreset;
        this.#checkValidate();
    }

    #checkValidate() {
        // rortorsPresetOrderのvalidation check
        if (this.#rotorsPresetOrder.some((order) => typeof order != "number")) {
            throw TypeError("rotorsPresetOrderの要素は数字でなければならない");
        }

        // rotorsAngleのvalidation check
        if (this.#rotorsAngle.some((order) => typeof order != "number")) {
            throw TypeError("rotorsAngleの要素は数字でなければならない");
        }

        // 全体の整合性チェック
        if (this.#rotorsPresetOrder.length != this.#numRotors) {
            throw TypeError("rotorsPresetOrderの配列長とnumRotorの値は等しくなければならない");
        }
        if (this.#rotorsAngle.length != this.#numRotors) {
            throw TypeError("rotorsAngleの配列長とnumRotorの値は等しくなければならない");
        }
    }

    rotorsSetting() {
        return this.#rotorsPresetOrder.map((_, i) => {
            return {
                presetOrder: this.#rotorsPresetOrder[i],
                angle: this.#rotorsAngle[i],
            };
        });
    }

    plugBoardScramblerPreset() {
        return this.#plugBoardScramblerPreset;
    }

    detail() {
        return Detail.fromObject({
            HEADLINE: "DAILY KEY DETAIL",
            CONTENTS: {
                "NUM ROTORS": `${this.#numRotors}`,
                "ROTORS SETTING": this.rotorsSetting().map((d) => {
                    return {
                        "PRESET ORDER": `${d["presetOrder"]}`,
                        ANGLE: `${d["angle"]}`,
                    };
                }),
                "PLUG BOARD PRESET": [{ "PRESET ORDER": `${this.#plugBoardScramblerPreset}` }],
            },
        });
    }
}

export { DailyKey };
