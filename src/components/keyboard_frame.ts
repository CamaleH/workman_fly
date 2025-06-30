export type KeyConfig = {
  text1: string;
  text2: string;
};

type Key = {
  group: SVGGElement;
  rect: SVGRectElement;
  text1: SVGTextElement;
  text2: SVGTextElement;
};

function reset_key(config: KeyConfig, key: Key) {
  key.text1.textContent = config.text1;
  key.text2.textContent = config.text2;
}

export function cfg_keybinds(keybinds: string[]): KeyConfig[] {
  const configs: KeyConfig[] = [];
  for (let i = 0; i < 30; i++) {
    switch (keybinds[i]) {
      case ';':
        configs.push({ text1: ':', text2: ';' });
        break;
      case ',':
        configs.push({ text1: '<', text2: ',' });
        break;
      case '.':
        configs.push({ text1: '>', text2: '.' });
        break;
      case '/':
        configs.push({ text1: '?', text2: '/' });
        break;
      default:
        configs.push({ text1: keybinds[i], text2: '' });
    }
  }
  return configs;
}

export function std_keyconfig(): KeyConfig[] {
  const workman = ["Q", "D", "R", "W", "B", "J", "F", "U", "P", ";",
    "A", "S", "H", "T", "G", "Y", "N", "E", "O", "I",
    "Z", "X", "M", "C", "V", "K", "L", ",", ".", "/"];
  return cfg_keybinds(workman);
}

export function createKeyBoard(keyconfig: KeyConfig[]): [(configs: KeyConfig[]) => void, SVGSVGElement] {
  const svgNS = "http://www.w3.org/2000/svg"
  const top = document.createElementNS(svgNS, "svg");
  top.setAttribute("x", "0");
  top.setAttribute("y", "0");
  top.setAttribute("width", "490");
  top.setAttribute("height", "160");
  top.setAttribute("overflow", "visible");

  let x = 0;
  let y = 0;
  const keys: Key[] = [];
  for (let i = 0; i < 30; i++) {
    const key = {
      group: document.createElementNS(svgNS, "g"),
      rect: document.createElementNS(svgNS, "rect"),
      text1: document.createElementNS(svgNS, "text"),
      text2: document.createElementNS(svgNS, "text")
    };
    top.appendChild(key.group);
    key.group.appendChild(key.rect);
    key.group.appendChild(key.text1);
    key.group.appendChild(key.text2);
    keys.push(key);

    // hover-in action.
    // group.addEventListener("mouseenter", () => {
    //   console.log("Hovered over key " + i.toString());
    // })
    // hover-out action.
    // group.addEventListener("mouseleave", () => {
    //   console.log("Left key " + i.toString());
    // })

    key.group.setAttribute("transform", "translate(" + x.toString() + "," + y.toString() + ")");

    const keyrect = key.rect;
    keyrect.setAttribute("x", "0");
    keyrect.setAttribute("y", "0");
    keyrect.setAttribute("rx", "8");
    keyrect.setAttribute("ry", "8");
    keyrect.classList.add("default-key");

    const text1 = key.text1;
    text1.setAttribute("x", "10");
    text1.setAttribute("y", "12");
    text1.setAttribute("text-anchor", "middle");
    text1.setAttribute("dominant-baseline", "middle");
    text1.setAttribute("direction", "ltr");
    text1.textContent = keyconfig[i].text1;

    const text2 = key.text2;
    text2.setAttribute("x", "10");
    text2.setAttribute("y", "27");
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("dominant-baseline", "middle");
    text2.setAttribute("direction", "ltr");
    text2.textContent = keyconfig[i].text2;

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

  const reset = (configs: KeyConfig[]) => {
    for(let i =0; i<30; i++) {
      reset_key(configs[i], keys[i]);
    }
  };
  return [reset, top];
}

