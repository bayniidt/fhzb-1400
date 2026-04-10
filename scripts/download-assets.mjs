import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assets = [
  { url: 'https://www.jiyuancap.com/videos/banner.mp4', dest: 'public/videos/hero-desktop.mp4' },
  { url: 'https://www.jiyuancap.com/videos/banner-m.mp4', dest: 'public/videos/hero-mobile.mp4' },
  { url: 'https://www.jiyuancap.com/logo.png', dest: 'public/images/logo.png' },
  { url: 'https://www.jiyuancap.com/images/omega.jpg', dest: 'public/images/omega-bg.jpg' },
  { url: 'https://www.jiyuancap.com/videos/block-compressed.mp4', dest: 'public/videos/about-block.mp4' },
  { url: 'https://www.jiyuancap.com/videos/global-compressed.mp4', dest: 'public/videos/portfolios.mp4' },
  { url: 'https://www.jiyuancap.com/videos/batch-compressed.mp4', dest: 'public/videos/omega-batch.mp4' },
];

async function download() {
  for (const asset of assets) {
    const dir = path.dirname(asset.dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    console.log(`Downloading ${asset.url} to ${asset.dest}...`);
    try {
      execSync(`curl -L "${asset.url}" -o "${asset.dest}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error(`Failed to download ${asset.url}: ${e.message}`);
    }
  }
}

download();
