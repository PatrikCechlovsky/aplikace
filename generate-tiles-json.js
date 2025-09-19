const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'app-v3', 'modules');
const modules = fs.readdirSync(modulesDir).filter(f => f.match(/^\d{3}-/));

modules.forEach(moduleFolder => {
  const tilesDir = path.join(modulesDir, moduleFolder, 'tiles');
  if (!fs.existsSync(tilesDir)) return;

  const files = fs.readdirSync(tilesDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => ({
      filename,
      title: filename.replace('.md', '').replace(/-/g, ' ').replace(/^\d+\s*/, '').replace(/\b\w/g, l => l.toUpperCase())
    }));

  // Výstupní JSON soubor – bude v každém tiles adresáři!
  const outJson = path.join(tilesDir, 'tiles.json');
  fs.writeFileSync(outJson, JSON.stringify(files, null, 2), 'utf-8');
  console.log(`Vygenerováno: ${outJson}`);
});
