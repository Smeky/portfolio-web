// @ts-ignore
import * as Three from 'three'
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export interface App3DOptions {
  container: HTMLElement
}

export class App3D {
  container: HTMLElement
  lastUpdateMs: number
  canvas: HTMLCanvasElement | null = null
  canvasWidth: number = 0
  canvasHeight: number = 0
  renderer: Three.WebGLRenderer
  scene: Three.Scene
  camera: Three.PerspectiveCamera
  directionalLight: Three.DirectionalLight
  pointLight: Three.PointLight
  ambientLight: Three.AmbientLight
  controls: OrbitControls

  constructor({ container }: Readonly<App3DOptions>) {
    this.container = container
    this.lastUpdateMs = 0

    this._update = this._update.bind(this)
    this.update = this.update.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  /**
   * Setup the scene
   * @override
   */
  async setup(): Promise<void> {} 

  /**
   * Destroy the scene
   * @override
   */
  dispose(): void {}

  /**
   * Update the scene
   * @override
   */
  update(delta: number): void {}

  async init(): Promise<void> {
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)

    this.canvasWidth = this.container.offsetWidth
    this.canvasHeight = this.container.offsetHeight

    this.renderer = new Three.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' })
    this.renderer.setSize(this.canvasWidth, this.canvasHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x111111, 1)
    this.renderer.autoClear = false

    this.scene = new Three.Scene()

    this.camera = new Three.PerspectiveCamera(75, this.canvasWidth / this.canvasHeight, 0.1, 1000)
    this.scene.add(this.camera)

    this.ambientLight = new Three.AmbientLight(0xffffff, 0.2)
    this.scene.add(this.ambientLight)

    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2
    this.controls.zoomSpeed = 2

    window.addEventListener('resize', this.onResize)

    await this.setup()
  }

  destroy(): void {
    this.renderer.setAnimationLoop(null)
    window.removeEventListener('resize', this.onResize)

    this.dispose()

    this.controls.dispose()
    this.renderer.dispose()
    this.container.removeChild(this.canvas as Node)
  }

  private _update(ms: number): void {
    const delta = (ms - this.lastUpdateMs) / 1000
    this.lastUpdateMs = ms

    this.controls.update()
    this.update(delta)
    this.renderer.render(this.scene, this.camera)
  }

  start(): void {
    this.renderer.setAnimationLoop(this._update)
  }

  onResize(): void {

  }
}
