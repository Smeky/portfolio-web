// @ts-ignore
import * as Three from 'three'
import { kdTree } from 'kd-tree-javascript'

type SphereCoords = {
  phi: number
  theta: number
}

type HexagonCoords = {
  x: number
  y: number
  z: number
  index?: number
}

type HexagonsOptions = {
  hexagonSize?: number
  hexagonHeight?: number
  sphereSize?: number
}

class Hexagons {
  DefaultOptions: HexagonsOptions = {
    hexagonSize: 0.005,
    hexagonHeight: 0.1,
    sphereSize: 1,
  }
  
  options: HexagonsOptions
  mesh: Three.InstancedMesh
  count: number
  kdTree!: kdTree<HexagonCoords>
  kdTreeDistance: (a: HexagonCoords, b: HexagonCoords) => number

  positions: Three.Vector3[] = []
  rotations: Three.Quaternion[] = []
  scales: Three.Vector3[] = []
  coords: HexagonCoords[] = []
  
  constructor(options: HexagonsOptions = {}) {
    this.options = { ...this.DefaultOptions, ...options }
    const { hexagonSize, hexagonHeight, sphereSize } = this.options

    // Setup hexagon mesh
    const geometry = new Three.CylinderGeometry(hexagonSize, hexagonSize, hexagonHeight, 6)
    const material = new Three.MeshStandardMaterial({ color: 0xffffff }) // 0x2d3033

    this.count = Math.round(Math.pow(sphereSize! / hexagonSize!, 1.9))
    this.mesh = new Three.InstancedMesh(geometry, material, this.count)
    
    this.positions = Array(this.count).fill(0).map(() => new Three.Vector3())
    this.rotations = Array(this.count).fill(0).map(() => new Three.Quaternion())
    this.scales = Array(this.count).fill(0).map(() => new Three.Vector3())
    this.coords = Array(this.count)
      .fill(0)
      .map((_, index): HexagonCoords => ({ index, x: 0, y: 0, z: 0 }))

    // Setup KD-Tree
    this.kdTreeDistance = (a: HexagonCoords, b: HexagonCoords) => {
      const x = a.x - b.x
      const y = a.y - b.y
      const z = a.z - b.z

      return Math.sqrt(x * x + y * y + z * z)
    }
    
    this.update()
  }

  destroy(): void {
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }

  update(): void {
    this.kdTree = new kdTree<HexagonCoords>(this.coords, this.kdTreeDistance, ['x', 'y', 'z'])
  }

  setMatrixAt(index: number, matrix: Three.Matrix4): void {
    this.mesh.setMatrixAt(index, matrix)

    const position = this.positions[index]
    const rotation = this.rotations[index]
    const scale = this.scales[index]
    const coords = this.coords[index]

    matrix.decompose(position, rotation, scale)

    coords.x = position.x
    coords.y = position.y
    coords.z = position.z
  }

  setHeight(index: number, height: number): void {
    const scale = this.scales[index]
    scale.y = height

    const matrix = new Three.Matrix4().compose(this.positions[index], this.rotations[index], scale)
    this.mesh.setMatrixAt(index, matrix)
    this.mesh.instanceMatrix.needsUpdate = true
  }

  setColor(index: number, color: Three.Color): void {
    this.mesh.setColorAt(index, color)
    this.mesh.instanceColor.needsUpdate = true
  }
}

/**
 * HexagonSphere
 * 
 * Contoller class for a sphere of hexagons, handling the layout and animations.
 */
export default class HexagonSphere extends Three.Group {
  hexagons: Hexagons

  private orbitPoint: SphereCoords = { phi: 0, theta: 0 }
  private lastNearestCoords: Set<HexagonCoords> = new Set()
  private baseColor: Three.Color = new Three.Color(0x333333)

  constructor() {
    super()

    this.hexagons = new Hexagons({ hexagonSize: 0.005, hexagonHeight: 0.1, sphereSize: 1 })
    this.add(this.hexagons.mesh)

    // Setup the sphere layout
    const count = this.hexagons.count
    const matrix = new Three.Matrix4()

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * i / count)
      const theta = (Math.PI * (1 + Math.sqrt(5)) * i) % (2 * Math.PI)

      const position = new Three.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
      )

      const rotation = new Three.Quaternion().setFromUnitVectors(new Three.Vector3(0, 1, 0), position.clone().normalize())
      const scale = new Three.Vector3(1, 0.01, 1)

      matrix.compose(position, rotation, scale)
      this.hexagons.setMatrixAt(i, matrix)
      this.hexagons.setColor(i, this.baseColor)
    }

    this.hexagons.update()
  }

  dispose(): void {
    this.hexagons.destroy()
  }

  update(delta: number): void {
    const speed = 0.1
    this.orbitPoint.phi += speed * delta
    this.orbitPoint.theta += speed * delta

    const x = Math.sin(this.orbitPoint.phi) * Math.cos(this.orbitPoint.theta)
    const y = Math.sin(this.orbitPoint.phi) * Math.sin(this.orbitPoint.theta)
    const z = Math.cos(this.orbitPoint.phi)

    const radius = 0.2
    const nearest = this.hexagons.kdTree.nearest({ x, y, z }, 200, radius)
    const nearestCoordsSet = new Set(nearest.map(([coords]) => coords))

    this.lastNearestCoords.forEach(coords => {
      if (!nearestCoordsSet.has(coords)) {
        this.hexagons.setHeight(coords.index!, 0.01)
        this.hexagons.setColor(coords.index!, this.baseColor)
      }
    })
    nearest.forEach(([coords, distance]) => {
      this.hexagons.setHeight(coords.index!, 5 * (1 - distance / radius))
      this.hexagons.setColor(coords.index!, new Three.Color(0xff0000).lerp(this.baseColor, distance / radius * 0.9))
    })

    this.lastNearestCoords = nearestCoordsSet
  }
}
