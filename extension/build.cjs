const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')

const EXT = __dirname
const DIST = path.join(EXT, 'dist')

// Clean dist
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true })
fs.mkdirSync(DIST)

const shared = {
  bundle: true,
  minify: false,
  sourcemap: false,
}

async function main() {
  // Bundle popup.js (includes @supabase/supabase-js)
  await esbuild.build({
    ...shared,
    entryPoints: [path.join(EXT, 'popup.js')],
    outfile: path.join(DIST, 'popup.js'),
    platform: 'browser',
    format: 'iife',
    globalName: 'JobTrackerPopup',
  })

  // Copy static files
  for (const file of ['manifest.json', 'popup.html', 'content.js', 'background.js']) {
    fs.copyFileSync(path.join(EXT, file), path.join(DIST, file))
  }

  console.log('Extension built →', DIST)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
