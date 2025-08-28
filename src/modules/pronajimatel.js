// Modul Pronajímatel – hlavní logika pro správu pronajímatelů.
// Závislosti: načítání HTML formulářů přes fetch, kontejner pro zobrazení (např. #main)

export class PronajimatelModule {
  constructor(containerSelector = '#main') {
    this.container = document.querySelector(containerSelector);
    this.types = [
      { id: 'osoba', label: 'Osoba', icon: '👤' },
      { id: 'osvc', label: 'SOVČ', icon: '🧑‍💼' },
      { id: 'firma', label: 'Firma', icon: '🏢' },
      { id: 'spolek', label: 'Spolek/skupina', icon: '🤝' },
      { id: 'zastupce', label: 'Zástupce', icon: '🧑‍⚖️' }
    ];
    // Dummy data, v reálné aplikaci by se načítalo z backendu
    this.data = {
      osoba: [],
      osvc: [],
      firma: [],
      spolek: [],
      zastupce: []
    };
    this.currentType = null;
    this.mode = 'list'; // 'list' | 'chooseType' | 'form'
    this.init();
  }

  init() {
    // Vykresli hlavní zobrazení
    this.render();
  }

  render() {
    if (!this.container) return;
    // Vyčisti kontejner
    this.container.innerHTML = '';

    // Hlavní přehled (seznam všech)
    if (this.mode === 'list') {
      const header = document.createElement('div');
      header.style = 'display:flex; justify-content:space-between; align-items:center; padding:18px;';
      header.innerHTML = `<h2>Seznam pronajímatelů</h2>
        <button class="btn primary" id="addPronajimatelBtn">+ Přidat nový záznam</button>`;
      this.container.appendChild(header);

      // Strana s typy (vlevo) – v aplikaci se zobrazuje v sidebaru
      const typeBar = document.createElement('div');
      typeBar.style = 'display:flex; gap:10px; margin-bottom:12px; padding-left:18px;';
      this.types.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerHTML = `${t.icon} ${t.label}`;
        btn.onclick = () => {
          this.currentType = t.id;
          this.mode = 'typeList';
          this.render();
        };
        typeBar.appendChild(btn);
      });
      this.container.appendChild(typeBar);

      // Tabulka všech typů dohromady
      const table = document.createElement('table');
      table.style = 'width:95%;margin:0 auto 24px;background:#101826;color:#e6edf3;border-radius:12px;overflow:hidden;';
      table.innerHTML = `<tr>
        <th>Typ</th><th>Jméno/Název</th><th>E-mail</th><th>Akce</th>
      </tr>`;
      this.types.forEach(t => {
        (this.data[t.id] || []).forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${t.label}</td>
            <td>${item.jmeno || item.nazev || '-'}</td>
            <td>${item.email || '-'}</td>
            <td>
              <button class="btn" data-act="edit" data-type="${t.id}" data-id="${item.id}">Upravit</button>
              <button class="btn" data-act="archive" data-type="${t.id}" data-id="${item.id}">Archivovat</button>
              <button class="btn" data-act="delete" data-type="${t.id}" data-id="${item.id}">Smazat</button>
            </td>`;
          table.appendChild(tr);
        });
      });
      this.container.appendChild(table);

      // Přidat nový záznam
      document.getElementById('addPronajimatelBtn').onclick = () => {
        this.mode = 'chooseType';
        this.render();
      };

      // Akce v tabulce
      table.querySelectorAll('button[data-act]').forEach(btn => {
        btn.onclick = (e) => {
          const type = btn.getAttribute('data-type');
          const id = btn.getAttribute('data-id');
          const act = btn.getAttribute('data-act');
          if (act === 'edit') this.openForm(type, id);
          if (act === 'archive') this.archive(type, id);
          if (act === 'delete') this.delete(type, id);
        };
      });
    }

    // Výběr typu nového pronajímatele (dlaždice)
    if (this.mode === 'chooseType') {
      const title = document.createElement('h3');
      title.style = 'padding:24px;';
      title.textContent = 'Vyberte typ pronajímatele';
      this.container.appendChild(title);

      const tiles = document.createElement('div');
      tiles.style = 'display:flex; gap:24px; justify-content:center; padding-bottom:32px;';
      this.types.forEach(t => {
        const tile = document.createElement('div');
        tile.className = 'pronajimatel-typ-tile';
        tile.setAttribute('data-type', t.id);
        tile.style = 'cursor:pointer; padding:24px; border-radius:14px; background:#121821; color:#e6edf3; min-width:120px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,.08);';
        tile.innerHTML = `<div style="font-size:38px; margin-bottom:12px;">${t.icon}</div>
          <strong>${t.label}</strong>`;
        tile.onclick = () => {
          this.openForm(t.id, null);
        };
        tiles.appendChild(tile);
      });
      this.container.appendChild(tiles);

      // Zpět
      const backBtn = document.createElement('button');
      backBtn.className = 'btn';
      backBtn.textContent = '← Zpět na seznam';
      backBtn.style = 'margin:12px 24px;';
      backBtn.onclick = () => {
        this.mode = 'list';
        this.render();
      };
      this.container.appendChild(backBtn);
    }

    // Seznam konkrétního typu pronajímatele
    if (this.mode === 'typeList' && this.currentType) {
      const t = this.types.find(x=>x.id===this.currentType);
      const header = document.createElement('div');
      header.style = 'display:flex; justify-content:space-between; align-items:center; padding:18px;';
      header.innerHTML = `<h2>Seznam: ${t.label}</h2>
        <button class="btn primary" id="addTypeBtn">+ Přidat ${t.label}</button>`;
      this.container.appendChild(header);

      // Tabulka typu
      const table = document.createElement('table');
      table.style = 'width:90%;margin:0 auto 24px;background:#101826;color:#e6edf3;border-radius:12px;overflow:hidden;';
      table.innerHTML = `<tr>
        <th>Jméno/Název</th><th>E-mail</th><th>Akce</th>
      </tr>`;
      (this.data[this.currentType] || []).forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.jmeno || item.nazev || '-'}</td>
          <td>${item.email || '-'}</td>
          <td>
            <button class="btn" data-act="edit" data-type="${this.currentType}" data-id="${item.id}">Upravit</button>
            <button class="btn" data-act="archive" data-type="${this.currentType}" data-id="${item.id}">Archivovat</button>
            <button class="btn" data-act="delete" data-type="${this.currentType}" data-id="${item.id}">Smazat</button>
          </td>`;
        table.appendChild(tr);
      });
      this.container.appendChild(table);

      // Přidat nový
      document.getElementById('addTypeBtn').onclick = () => {
        this.openForm(this.currentType, null);
      };

      // Akce v tabulce
      table.querySelectorAll('button[data-act]').forEach(btn => {
        btn.onclick = (e) => {
          const type = btn.getAttribute('data-type');
          const id = btn.getAttribute('data-id');
          const act = btn.getAttribute('data-act');
          if (act === 'edit') this.openForm(type, id);
          if (act === 'archive') this.archive(type, id);
          if (act === 'delete') this.delete(type, id);
        };
      });

      // Zpět
      const backBtn = document.createElement('button');
      backBtn.className = 'btn';
      backBtn.textContent = '← Zpět na seznam všech';
      backBtn.style = 'margin:12px 24px;';
      backBtn.onclick = () => {
        this.mode = 'list';
        this.currentType = null;
        this.render();
      };
      this.container.appendChild(backBtn);
    }
  }

  // Otevři formulář pro daný typ, id=null pro nový záznam
  async openForm(type, id) {
    this.mode = 'form';
    this.formType = type;
    this.formId = id;
    this.container.innerHTML = `<div style="padding:32px;"><h3>Načítám formulář...</h3></div>`;
    // Načti HTML formulář podle typu
    const formUrl = `src/forms/form-${type}.html`;
    try {
      const resp = await fetch(formUrl);
      const html = await resp.text();
      this.container.innerHTML = html;
      // Bind submit
      const formEl = this.container.querySelector('form');
      if (formEl) {
        formEl.onsubmit = (e) => {
          e.preventDefault();
          const data = {};
          // Načíst všechna data z formuláře (input, select, textarea)
          Array.from(formEl.elements).forEach(el => {
            if (el.name) data[el.name] = el.value;
          });
          if (id) {
            // úprava
            const arr = this.data[type];
            const idx = arr.findIndex(x=>x.id===id);
            if (idx>=0) arr[idx] = { ...arr[idx], ...data };
          } else {
            // nový záznam
            data.id = `${type}-${Date.now()}`;
            this.data[type].push(data);
          }
          // Po uložení zobrazit seznam daného typu
          this.mode = 'typeList';
          this.currentType = type;
          this.render();
        };
      }
      // Zpět
      const backBtn = this.container.querySelector('.btn-back');
      if (backBtn) {
        backBtn.onclick = () => {
          this.mode = id ? 'typeList' : 'chooseType';
          this.render();
        };
      }
    } catch (err) {
      this.container.innerHTML = `<div style="padding:32px;"><h3>Formulář nelze načíst.</h3></div>`;
    }
  }

  // Archivace záznamu
  archive(type, id) {
    const arr = this.data[type];
    const idx = arr.findIndex(x=>x.id===id);
    if (idx>=0) {
      arr[idx].archived = true;
      this.render();
    }
  }

  // Smazání záznamu
  delete(type, id) {
    const arr = this.data[type];
    const idx = arr.findIndex(x=>x.id===id);
    if (idx>=0) {
      arr.splice(idx,1);
      this.render();
    }
  }
}