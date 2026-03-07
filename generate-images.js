const fs = require('fs');
const sharp = require('sharp');

const cars = [
    { file: 'toyota-corolla-altis.png', title: 'Toyota Corolla Altis' },
    { file: 'toyota-land-cruiser-v8.png', title: 'Land Cruiser V8' },
    { file: 'hyundai-sonata.png', title: 'Hyundai Sonata' },
    { file: 'hyundai-elantra.png', title: 'Hyundai Elantra' },
    { file: 'audi-a6.png', title: 'Audi A6' },
    { file: 'kia-carnival.png', title: 'KIA Grand Carnival' },
    { file: 'changan-karvaan.png', title: 'Changan Karvaan' },
    { file: 'suzuki-apv.png', title: 'Suzuki APV' },
    { file: 'toyota-coaster.png', title: 'Toyota Coaster' },
    { file: 'toyota-prius.png', title: 'Toyota Prius' },
    { file: 'toyota-vitz.png', title: 'Toyota Vitz' },
    { file: 'honda-hrv.png', title: 'Honda HR-V' }
];

async function generate() {
    for (const c of cars) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
      <rect width="800" height="450" fill="#0a0a0a" />
      <path d="M 250 250 L 300 180 L 500 180 L 550 250 L 600 250 C 620 250 630 260 630 280 L 630 320 C 630 340 620 350 600 350 L 200 350 C 180 350 170 340 170 320 L 170 280 C 170 260 180 250 200 250 Z" fill="none" stroke="#2ecc71" stroke-width="4" opacity="0.3"/>
      <circle cx="280" cy="350" r="35" fill="#0f0f0f" stroke="#2ecc71" stroke-width="4" opacity="0.3"/>
      <circle cx="520" cy="350" r="35" fill="#0f0f0f" stroke="#2ecc71" stroke-width="4" opacity="0.3"/>
      <text x="400" y="210" fill="#2ecc71" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="42" font-weight="bold" text-anchor="middle">${c.title}</text>
      <text x="400" y="260" fill="#ffffff" opacity="0.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" text-anchor="middle">Image Coming Soon</text>
    </svg>`;

        await sharp(Buffer.from(svg))
            .png()
            .toFile('./public/cars/' + c.file);
    }
}

generate().then(() => console.log('Images generated!')).catch(console.error);
