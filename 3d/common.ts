// @ts-ignore
import * as Three from 'three'
// @ts-ignore
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

export async function loadTexture(url: string): Promise<Three.Texture> {
  return new Promise((resolve, reject) => {
    new Three.TextureLoader().load(url, resolve, undefined, reject)
  })
}

export async function loadFont(url: string): Promise<Three.Font> {
  return new Promise((resolve, reject) => {
    new FontLoader().load(url, resolve, undefined, reject)
  })
}
