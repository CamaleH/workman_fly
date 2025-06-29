// let frequencePromise = fetch('frequence.json').then(response => response.json());

// async function work() {
//   let frequence = await frequencePromise;
// }
import { std_keyconfig, createKeyBoard } from './components/keyboard_frame.ts'

const std_keyboard = createKeyBoard(std_keyconfig());

document.body.append(std_keyboard);

console.log("from typescript");
