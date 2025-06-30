// let frequencePromise = fetch('frequence.json').then(response => response.json());

// async function work() {
//   let frequence = await frequencePromise;
// }
import { std_keyconfig, createKeyBoard, cfg_keybinds } from './components/keyboard_frame.ts'
import { createLayoutSetter } from './components/layout.ts'

const std_keyboard = createKeyBoard(std_keyconfig());

function if_valid(key_binds: string[]) {
  let configs = cfg_keybinds(key_binds);
  std_keyboard[0](configs);
}

const layout_setter = createLayoutSetter(if_valid);
document.body.appendChild(layout_setter);

document.body.append(std_keyboard[1]);
