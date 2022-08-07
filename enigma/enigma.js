import { Detail } from "../detail/detail.js";
class KeyIndexConverter {
    static keyToIndex(key) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet.indexOf(key.toLowerCase());
    }
    static indexToKey(index) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        if (0 <= index && index < 26) {
            return alphabet[index];
        } else {
            return "";
        }
    }
}

class Scrambler {
    #wiringDiagramFowardOrder
    #wiringDiagramReverseOrder
    constructor(wiringDiagramFowardOrder) {
        this.#wiringDiagramFowardOrder = wiringDiagramFowardOrder;
        this.#wiringDiagramReverseOrder = this.#generateWiringDiagramReverseOrder();
    }

    #generateWiringDiagramReverseOrder() {
        let wiringDiagramReverseOrder = new Array(26);

        this.#wiringDiagramFowardOrder.forEach((elem, index) => {
            wiringDiagramReverseOrder[elem] = index;
        });

        return wiringDiagramReverseOrder;
    }

    passFowardOrder(i) {
        return this.#wiringDiagramFowardOrder[i];
    }

    passReverseOrder(i) {
        return this.#wiringDiagramReverseOrder[i];
    }

    copy() {
        return new Scrambler([... this.#wiringDiagramFowardOrder])
    }


    contents() {
        return [
            {
                "FORWARD ORDER": [
                    {
                        "INDEX": this.#wiringDiagramFowardOrder
                            .map((_, index) => KeyIndexConverter.indexToKey(index))
                            .join(" "),
                        "VALUE": this.#wiringDiagramFowardOrder
                            .map(value => KeyIndexConverter.indexToKey(value))
                            .join(" ")
                    }
                ],
                "REVERSE ORDER": [
                    {
                        "INDEX": this.#wiringDiagramReverseOrder
                            .map((_, index) => KeyIndexConverter.indexToKey(index))
                            .join(" "),
                        "VALUE": this.#wiringDiagramReverseOrder
                            .map(value => KeyIndexConverter.indexToKey(value))
                            .join(" ")
                    }
                ]
            }
        ]
    }
}

class PlugBoard {
    #scrambler
    constructor(scrambler) {
        this.#scrambler = scrambler;
    }

    passFowardOrder(i) {
        return this.#scrambler.passFowardOrder(i);
    }

    passReverseOrder(i) {
        return this.#scrambler.passReverseOrder(i);
    }

    copy() {
        return new PlugBoard(this.#scrambler.copy())
    }

    contents() {
        return [
            {
                "SCRAMBLER PART": this.#scrambler.contents()
            }
        ]
    }
}

class Rotor {
    #scrambler
    #angle
    constructor(scrambler, angle) {
        this.#scrambler = scrambler;
        this.#angle = angle
    }

    passFowardOrder(i) {
        const iScrambler = (((i - this.#angle) % 26) + 26) % 26;
        const vScrambler = this.#scrambler.passFowardOrder(iScrambler);
        return (vScrambler + this.#angle) % 26;
    }

    passReverseOrder(i) {
        const iScrambler = (((i - this.#angle) % 26) + 26) % 26;
        const vScrambler = this.#scrambler.passReverseOrder(iScrambler);

        return (vScrambler + this.#angle) % 26;
    }

    rotate() {
        this.#angle++ % 26;
        return this.#angle === 0;
    }


    setAngle(angle) {
        return new Rotor(this.#scrambler.copy(), angle)
    }

    copy() {
        return new Rotor(this.#scrambler.copy(), this.#angle)
    }

    contents() {
        return [
            {
                "ROTOR ANGLE": `${this.#angle}`,
                "SCRAMBLER PART": this.#scrambler.contents()
            }
        ]
    }
}

class Reflector {
    reflect(i) {
        return 25 - i;
    }
    copy() {
        return this
    }

    contents() {
        const indexArray = [...Array(26)].map((_, index) => index)
        return [
            {
                "FORWARD ORDER": indexArray
                    .map(value => KeyIndexConverter.indexToKey(value))
                    .join(" "),
                "REVERSE ORDER": indexArray
                    .map(value => KeyIndexConverter.indexToKey(this.reflect(value)))
                    .join(" ")
            }
        ]
    }
}

class Enigma {
    #plugboard
    #rotors
    #reflector
    constructor(plugboard, rotors, reflector) {
        this.#plugboard = plugboard;
        this.#rotors = rotors;
        this.#reflector = reflector;
        console.log(this.detail())
        console.log(this.detail().describe())
    }

    #numEncryptionProcess() {
        return this.#rotors.length * 2 + 4
    }

    #rotateRotor() {

        for (const rotor of this.#rotors) {
            if (!rotor.rotate()) return;
        }
    }

    resetRotorsAngle(angles) {
        const rotors = this.#rotors.map((rotor, index) => {
            return rotor.setAngle(angles[index])
        })
        return new Enigma(
            this.#plugboard.copy(),
            rotors,
            this.#reflector.copy()
        )
    }

    typeKeyDetail(key) {
        let encrypting_detail = new Array(this.#numEncryptionProcess());
        let iEncryptingDetail = 0

        // key to index
        encrypting_detail[iEncryptingDetail++]
            = KeyIndexConverter.keyToIndex(key);

        // pass forward order /////////////////////////////////////////////////////

        // pass plugboard
        encrypting_detail[iEncryptingDetail]
            = this.#plugboard.passFowardOrder(
                encrypting_detail[iEncryptingDetail++ - 1]
            );

        // pass rotors
        this.#rotors.forEach((rotor) => {
            encrypting_detail[iEncryptingDetail] = rotor.passFowardOrder(
                encrypting_detail[iEncryptingDetail++ - 1]
            );
        });

        // reflection /////////////////////////////////////////////////////

        encrypting_detail[iEncryptingDetail] = this.#reflector.reflect(
            encrypting_detail[iEncryptingDetail++ - 1]
        );

        // pass forward order /////////////////////////////////////////////////////

        // pass rotors
        this.#rotors
            .slice()
            .reverse()
            .forEach((rotor) => {
                encrypting_detail[iEncryptingDetail] = rotor.passReverseOrder(
                    encrypting_detail[iEncryptingDetail++ - 1]
                );
            });

        // pass plugboard
        encrypting_detail[iEncryptingDetail] = this.#plugboard.passReverseOrder(
            encrypting_detail[iEncryptingDetail++ - 1]
        );

        this.#rotateRotor();
        return encrypting_detail;
    }

    typeKey(key) {
        return KeyIndexConverter.indexToKey(
            this.typeKeyDetail(key).slice(-1)[0]
        );
    }

    typeText(text) {
        return text
            .split("")
            .map(key => this.typeKey(key))
            .join("")
    }

    detail() {
        return Detail.fromObject(
            {
                "HEADLINE": "ENIGMA DETAIL",
                "CONTENTS": {
                    "PLUG BOARD PART": this.#plugboard.contents(),
                    "ROTORS PART": this.#rotors.map((rotor, index) => {
                        return { [`${index}TH ROTOR PART`]: rotor.contents() }
                    }),
                    "REFLECTOR PART": this.#reflector.contents()
                }
            }
        )
    }
}
export { Scrambler, PlugBoard, Reflector, Rotor, Enigma, KeyIndexConverter };
