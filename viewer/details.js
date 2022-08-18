class Details {
    static details = () => {
        const details = document.createElement("details");

        details.appendChild(this.#summary());
        details.appendChild(this.#describe());
        details.open = false;
        details.style.width = "100%";
        return details;
    };

    static #summary = () => {
        const summary = document.createElement("summary");

        summary.innerText = "説明";
        summary.style.fontWeight = "bold";
        summary.style.cursor = "pointer";
        summary.style.transition = "none";
        summary.style.color = "hsla(111, 100%, 40%, 1)";
        summary.style.fontSize = "20px";

        summary.addEventListener("mouseover", () => {
            summary.style.transition = "all, 0.5s ease-out";
            summary.style.color = "hsla(300, 100%, 40%, 1)";
        });
        summary.addEventListener("mouseout", () => {
            summary.style.transition = "all, 1s ease-out";
            summary.style.color = "hsla(111, 100%, 40%, 1)";
        });
        return summary;
    };

    static #describe = () => {
        const describe = document.createElement("p");

        describe.style.color = "hsla(111, 70%, 35%, 1)";
        describe.innerText = `暗号化: 通信鍵と暗号化したい文章を入力すると、暗号化された文章が出てきます。
            通信鍵によってEnigmaの中身がscrambleされるため、同じ文章でも異なる通信鍵を用いることで、異なる暗号文が生成されます
            復号化: 暗号化された文章を貼り付けることで通信鍵と文章の復号化を行います。
            自分で作成した暗号文をコピペして復号化のチェックを行ったり、他人から送られた暗号文をコピペすることで元の文章の復号化が行えます。
            暗号化/復号化に共通して、通信鍵の形式が不正だと正しくEnigmaが動作しませんのでご注意ください
            
            通信鍵: 3文字の小文字アルファベットを2回繰り返した、計6文字の文字列。
            例) psvpsv => OK!, 例) aaaaaa => OK!, 例) aabaab => OK!
            例) psps => NG! (6文字でないため) 
            例) psvvsp => NG! (繰り返しの形になっていないため)
            例) PSVPSV => NG! (大文字アルファベットは使用できません)`;
        return describe;
    };
}

export { Details };
