// let frequencePromise = fetch('frequence.json').then(response => response.json());

// async function work() {
//   let frequence = await frequencePromise;
// }
import { std_keyconfig, createKeyBoard, cfg_keybinds } from './components/keyboard_frame.ts'
import { createLayoutSetter } from './components/layout.ts'
import { createStrainSetter } from './components/strain.ts'

const std_keyboard = createKeyBoard(std_keyconfig());

function if_layout_valid(key_binds: string[]) {
  let configs = cfg_keybinds(key_binds);
  std_keyboard[0](configs);
}

function if_strains_valid(key_strains: number[]) {
}

const layout_setter = createLayoutSetter(if_layout_valid);
document.body.appendChild(layout_setter);

document.body.appendChild(std_keyboard[1]);

const strain_setter = createStrainSetter(if_strains_valid);
document.body.appendChild(strain_setter);
