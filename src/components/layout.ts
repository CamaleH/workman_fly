const all_keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z',
  ',', '.', '/', ';'];

const key_idx: { [key: string]: number } = {};
for (let i = 0; i < 30; i++) {
  key_idx[all_keys[i]] = i;
}

const preset: { [key: string]: string[] } = {
  workman: ['Q', 'D', 'R', 'W', 'B', 'J', 'F', 'U', 'P', ';',
    'A', 'S', 'H', 'T', 'G', 'Y', 'N', 'E', 'O', 'I',
    'Z', 'X', 'M', 'C', 'V', 'K', 'L', ',', '.', '/'],
  devorak: ['/', ',', '.', 'P', 'Y', 'F', 'G', 'C', 'R', 'L',
    'A', 'O', 'E', 'U', 'I', 'D', 'H', 'T', 'N', 'S',
    ';', 'Q', 'J', 'K', 'X', 'B', 'M', 'W', 'V', 'Z'],
  colemak: ['Q', 'W', 'F', 'P', 'G', 'J', 'L', 'U', 'Y', ';',
    'A', 'R', 'S', 'T', 'D', 'H', 'N', 'E', 'I', 'O',
    'Z', 'X', 'C', 'V', 'B', 'K', 'M', ',', '.', '/'],
  qwerty: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
};

function set_preset(key_binding: HTMLSelectElement[], selected: string) {
  const p = preset[selected];
  for (let i = 0; i < 30; i++) {
    key_binding[i].value = p[i];
  }
}

function check_valid(key_binding: HTMLSelectElement[]): [boolean, string] {
  const cnt: { [key: string]: number } = {};
  const dup: string[] = [];
  const not_set: string[] = [];
  let valid: boolean = true;
  let info: string = "";
  for (let i = 0; i < 30; i++) {
    cnt[all_keys[i]] = 0;
  }
  for (let i = 0; i < 30; i++) {
    const selected = key_binding[i].value;
    cnt[selected]++;
  }
  for (let i = 0; i < 30; i++) {
    if (cnt[all_keys[i]] == 0) {
      not_set.push(all_keys[i]);
    }
    if (cnt[all_keys[i]] > 1) {
      dup.push(all_keys[i]);
    }
  }
  if (not_set.length > 0) {
    valid = false;
    info += "not_set: [ " + not_set[0];
    for (let i = 1; i < not_set.length; i++) {
      info += ", " + not_set[i];
    }
    info += " ] ";
  }
  if (dup.length > 0) {
    valid = false;
    info += "dup_set: [ " + dup[0];
    for (let i = 1; i < dup.length; i++) {
      info += ", " + dup[i];
    }
    info += " ] ";
  }
  if (valid) {
    info = "valid";
  }
  return [valid, info];
}

export function createLayoutSetter(if_valid: (key_binds: string[]) => void): HTMLDivElement {
  // Prepare select.
  const layout_sel = document.createElement('select');
  layout_sel.name = 'layout_sel';
  ['Workman', 'Devorak', 'Colemak', 'Qwerty', 'Custom'].forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.toLocaleLowerCase();
    option.text = opt;
    layout_sel.appendChild(option);
  });

  const key_binding: HTMLSelectElement[] = [];
  for (let i = 0; i < 30; i++) {
    const key_sel = document.createElement('select');
    key_sel.name = `K${i+1}_sel`;
    all_keys.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.text = opt;
      key_sel.appendChild(option);
    });
    key_binding.push(key_sel);
  }

  const info = document.createElement('span');
  info.textContent = 'Info: valid';

  layout_sel.addEventListener('change', (event) => {
    const selected = (event.target as HTMLSelectElement).value;
    if (selected != 'custom') {
      set_preset(key_binding, selected);
      info.textContent = 'Info: valid';
      if_valid(preset[selected]);
    }
  });

  for (let i = 0; i < 30; i++) {
    key_binding[i].addEventListener('change', (_event) => {
      layout_sel.value = 'custom';
      const res = check_valid(key_binding);
      info.textContent = "Info: " + res[1];
      if (res[0]) {
        const key_binds: string[] = [];
        for (let i = 0; i < 30; i++) {
          key_binds.push(key_binding[i].value);
        }
        if_valid(key_binds);
      }
    })
  }

  // Set default
  layout_sel.value = 'workman';
  set_preset(key_binding, 'workman');

  // Create layout.
  const container = document.createElement('div');
  const row = document.createElement('div');
  const leftText = document.createElement('span');
  leftText.textContent = 'Select a keyboard layout: ';
  row.appendChild(leftText);
  layout_sel.style.marginLeft = '16px';
  row.appendChild(layout_sel);
  info.style.marginLeft = '16px';
  row.appendChild(info);
  row.style.marginBottom = '8px';
  container.appendChild(row);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
  grid.style.gap = '8px';

  for (let i = 0; i < 30; i++) {
    const cell = document.createElement('div');
    cell.style.display = 'flex';
    cell.style.justifyContent = 'start';
    cell.style.alignItems = 'center';

    const keyx = document.createElement('span');
    keyx.textContent = `K${i + 1}`;
    cell.appendChild(keyx);

    key_binding[i].style.marginLeft = '4px';
    cell.appendChild(key_binding[i]);

    grid.appendChild(cell);
  }

  container.appendChild(grid);
  container.style.marginBottom = '16px';

  return container;
}
