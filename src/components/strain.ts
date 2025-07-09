const preset: { [key: string]: number[] } = {
  workman: [4, 2, 2, 3, 4, 5, 3, 2, 2, 4,
    1.5, 1, 1, 1, 3, 3, 1, 1, 1, 1, 5,
    4, 4, 3, 2, 5, 3, 2, 3, 4, 4]
}

export function createStrainSetter(if_valid: (key_strains: number[]) => void): HTMLDivElement {
  const strains_sel = document.createElement('select');
  strains_sel.name = 'strains_sel';
  ['Workman', 'Custom'].forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.toLocaleLowerCase();
    option.text = opt;
    strains_sel.appendChild(option);
  })

  const invalids: boolean[] = [];
  for (let i = 0; i < 30; i++) {
    invalids.push(false);
  }

  const info = document.createElement('span');
  info.textContent = 'Info: valid';

  const strain_setters: HTMLInputElement[] = [];
  const def = preset['workman'];
  for (let i = 0; i < 30; i++) {
    const strain_set = document.createElement('input');
    strain_set.name = `S${i + 1}`;
    strain_set.value = def[i].toString();
    strain_setters.push(strain_set);

    strain_set.addEventListener('change', () => {
      const value = Number(strain_set.value);
      if (isNaN(value) || value < 0) {
        invalids[i] = true;
      } else {
        invalids[i] = false;
      }
      let report = '';
      let all_valid = true;
      for (let j = 0; j < 30; j++) {
        if (invalids[j]) {
          all_valid = false;
          report += `S_K${i+1} `;
        }
      }
      if(all_valid){
        info.textContent = 'Info: valid';
        const strains: number[] = [];
        for (let i = 0; i< 30; i++) {
          strains.push(Number(strain_setters[i].value));
        }
        if_valid(strains);
      } else {
        info.textContent = 'Info: ' + report + 'invalid';
      }
    })
  }

  // Create layout
  const container = document.createElement('div');
  const row = document.createElement('div');
  const leftText = document.createElement('span');
  leftText.textContent = 'Select a preset strain setting';
  row.appendChild(leftText);
  strains_sel.style.marginLeft = '16px';
  row.appendChild(strains_sel);
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

    const SKx = document.createElement('span');
    SKx.textContent = `S_K${i + 1}`;
    cell.appendChild(SKx);

    strain_setters[i].style.marginLeft = '4px';
    strain_setters[i].size = 5;
    cell.appendChild(strain_setters[i]);

    grid.appendChild(cell);
  }

  container.appendChild(grid);
  container.style.marginBottom = '16px';

  return container;
}
