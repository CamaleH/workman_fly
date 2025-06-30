// let frequencePromise = fetch('frequence.json').then(response => response.json());

// async function work() {
//   let frequence = await frequencePromise;
// }
import { std_keyconfig, createKeyBoard } from './components/keyboard_frame.ts'
import { createLayoutSetter } from './components/layout.ts'

const std_keyboard = createKeyBoard(std_keyconfig());

const layout_setter = createLayoutSetter();

document.body.appendChild(layout_setter);

document.body.append(std_keyboard);

