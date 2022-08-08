class Detail {
    #headline;
    #contents;
    constructor(headline = "EMPTY", contents = {}) {
        this.#headline = headline;
        this.#contents = contents;
    }

    static fromObject = (obj) => {
        return new this(obj?.["HEADLINE"], obj?.["CONTENTS"]);
    };

    static #withPrefix(value, i = 0) {
        return "  ".repeat(i) + `${value}`;
    }

    static #withPrefixHeadline(value, i = 0) {
        return "  ".repeat(i) + `# ${value} #`;
    }

    static #describeContent(obj, i = 0) {
        let ret = [];
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "string") {
                ret.push(this.#withPrefix(`${key}: ${obj[key]}`, i));
            } else if (Array.isArray(obj[key])) {
                ret.push(this.#withPrefixHeadline(`START ${key}:`, i));
                obj[key].forEach((elem) => {
                    ret = ret.concat(this.#describeContent(elem, i + 1));
                });
                ret.push(this.#withPrefixHeadline(`END ${key}:`, i));
                ret.push("");
            }
        });
        return ret;
    }

    describe() {
        return [`##### DESCRIBE: ${this.#headline} #####`, ...Detail.#describeContent(this.#contents, 1)];
    }
}

export { Detail };
