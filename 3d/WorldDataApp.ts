// @ts-ignore
import * as Three from 'three'
import { App3D } from '@/3d/App3d'
import { loadTexture } from '@/3d/common'
import HexagonSphere from './HexagonSphere'

export default class WorldDataApp extends App3D {
  sun: Three.DirectionalLight
  globe: Three.Group
  hexagonsSphere: HexagonSphere | undefined

  async setup(): Promise<void> {
    this.camera.position.y = 2
    this.camera.position.x = 0
    this.camera.position.z = 2

    this.sun = this._createSun()
    this.globe = new Three.Group()
    this.hexagonsSphere = new HexagonSphere()

    this.globe.add(this.hexagonsSphere)
    this.scene.add(this.globe)
    this.scene.add(this.sun)

    this._createEarth().then((earth: Three.Mesh) => this.globe.add(earth))
  }

  dispose(): void {
    this.hexagonsSphere?.dispose()
  }

  private async _createEarth(): Three.Mesh {
    const baseTexture = await loadTexture('/images/earth-base.jpg')
    // const landTexture = await loadTexture('/images/earth-land.png')
    // const elevationTexture = await loadTexture('/images/earth-elevation.jpg')
    const lightsTexture = await loadTexture('/images/earth-lights.png')

    const geometry = new Three.SphereGeometry(1, 256, 256)
    const material = new Three.MeshStandardMaterial({ 
      map: baseTexture, 
      // roughness: 0.5, 
      // metalnessMap: landTexture, 
      // metalness: 0.5, 
      emissiveMap: lightsTexture, 
      emissive: 0xffff88, 
      // bumpMap: elevationTexture, 
      // bumpScale: 0.05 
    })

    material.color = new Three.Color(0x333333)

    const sphere = new Three.Mesh(geometry, material)

    return sphere
  }

  private _createSun(): Three.DirectionalLight {
    const light = new Three.DirectionalLight(0xffffff, 3)
    light.position.set(5, 5, 5)

    return light
  }

  update(delta: number): void {
    this.globe.rotation.y += 0.05 * delta
    this.hexagonsSphere?.update(delta)
  }
}
