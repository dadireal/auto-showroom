const sharp = require('sharp');
const fs = require('fs');

async function processJetour() {
  let svg = fs.readFileSync('public/brands/jetour_official_logo.svg', 'utf8');
  svg = svg.replace(/fill="#090505"/g, 'fill="#FFFFFF"');
  
  await sharp(Buffer.from(svg))
    .resize({ width: 500 })
    .toFile('public/brands/jetour_official_white.png');
    
  console.log('Saved jetour_official_white.png!');
}

processJetour();
