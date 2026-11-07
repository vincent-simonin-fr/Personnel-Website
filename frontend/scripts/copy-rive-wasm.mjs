// postinstall: self-host the Rive WASM that matches the installed runtime.
// A committed copy drifts on upgrade and crashes the renderer
// ("this.artboard.didChange is not a function"), so it is generated, not versioned.
import { copyFileSync, mkdirSync } from 'node:fs'

mkdirSync('public/rive', { recursive: true })
copyFileSync('node_modules/@rive-app/canvas/rive.wasm', 'public/rive/rive.wasm')
