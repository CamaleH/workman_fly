export type KeyConfig = {
  text1: string;
  text2: string;
};

export function std_keyconfig(): KeyConfig[] {
  const T1 = ["Q", "D", "R", "W", "B", "J", "F", "U", "P", ":",
    "A", "S", "H", "T", "G", "Y", "N", "E", "O", "I",
    "Z", "X", "M", "C", "V", "K", "L", "<", ">", "?"];
  const T2 = [" ", " ", " ", " ", " ", " ", " ", " ", " ", ";",
    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", ",", ".", "/"];
  const configs: KeyConfig[] = [];
  for (let i = 0; i < 30; i++) {
    const config = { text1: T1[i], text2: T2[i] };
    configs.push(config);
  }
  return configs;
}

export function createKeyBoard(keyconfig: KeyConfig[]): SVGSVGElement{
  const svgNS = "http://www.w3.org/2000/svg"
  const top = document.createElementNS(svgNS, "svg");
  top.setAttribute("x", "0");
  top.setAttribute("y", "0");
  top.setAttribute("width", "490");
  top.setAttribute("height", "160");
  top.setAttribute("overflow", "visible");

  let x = 0;
  let y = 0;
  for (let i = 0; i < 30; i++) {
    const key = document.createElementNS(svgNS, "rect");
    key.setAttribute("x", x.toString());
    key.setAttribute("y", y.toString());
    key.setAttribute("rx", "8");
    key.setAttribute("ry", "8");
    key.classList.add("default-key");
    top.appendChild(key);

    const text1 = document.createElementNS(svgNS, "text");
    text1.setAttribute("x", (x + 10).toString());
    text1.setAttribute("y", (y + 12).toString());
    text1.setAttribute("text-anchor", "middle");
    text1.setAttribute("dominant-baseline", "middle");
    text1.setAttribute("direction", "ltr");
    text1.textContent = keyconfig[i].text1;
    top.appendChild(text1);

    const text2 = document.createElementNS(svgNS, "text");
    text2.setAttribute("x", (x + 10).toString());
    text2.setAttribute("y", (y + 27).toString());
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("dominant-baseline", "middle");
    text2.setAttribute("direction", "ltr");
    text2.textContent = keyconfig[i].text2;
    top.appendChild(text2);

    if (i == 9) {
      x = 10;
      y = 40;
    } else if (i == 19) {
      x = 30;
      y = 80;
    } else {
      x += 40;
    }
  }
  return top;
}

