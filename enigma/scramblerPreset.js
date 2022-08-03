
import { Scrambler } from "./enigma.js";

const generate_wiring_diagram = () => {
    return Array(26)
        .fill()
        .map((_, i) => i);
};

const generate_scrambled_wiring_diagram = (numIter, x, y) => {
    let wiring_diagram = generate_wiring_diagram();
    for (let iter = 0; iter < numIter; iter++) {
        const i = iter % 26
        const j = ((i + x) * (i + y)) % 26;
        const tmp = wiring_diagram[i];
        wiring_diagram[i] = wiring_diagram[j];
        wiring_diagram[j] = tmp;
    }
    return wiring_diagram
}


const generate_scrambler_type1 = () => new Scrambler(generate_scrambled_wiring_diagram(100, 1, 1))
const generate_scrambler_type2 = () => new Scrambler(generate_scrambled_wiring_diagram(100, 10, 2))
const generate_scrambler_type3 = () => new Scrambler(generate_scrambled_wiring_diagram(100, 22, 8))

const scramblerPreset = [generate_scrambler_type1(), generate_scrambler_type2(), generate_scrambler_type3()]

export { scramblerPreset }