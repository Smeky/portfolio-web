import * as Three from 'three'
import { kdTree } from 'kd-tree-javascript'

type SphereCoords = {
  phi: number
  theta: number
  index?: number
}

type Hexagons = {
  count: number
  instance: Three.InstancedMesh
  positions: Three.Vector3[]
  rotations: Three.Quaternion[]
  scales: Three.Vector3[]
  sphereCoords: SphereCoords[]
}

/**
 * HexagonSphere
 * 
 * Contoller class for a sphere of hexagons, handling the layout and animations.
 */
export default class HexagonSphere extends Three.Group {
  HexagonSize = 0.005
  HexagonHeight = 0.1
  SphereSize = 1

  hexagons: Hexagons

  private kdTree: kdTree<SphereCoords>
  private lastNearestCoords: SphereCoords[] = []

  constructor() {
    super()

    this.hexagons = this._setupHexagons()
    this._setupLayout(this.hexagons)
    this.add(this.hexagons.instance)

    const distance = (a: SphereCoords, b: SphereCoords) => {
      const phiDiff = Math.min(Math.abs(a.phi - b.phi), 2 * Math.PI - Math.abs(a.phi - b.phi))
      const thetaDiff = Math.min(Math.abs(a.theta - b.theta), 2 * Math.PI - Math.abs(a.theta - b.theta))
      return Math.sqrt(phiDiff * phiDiff + thetaDiff * thetaDiff)
    }
    
    this.kdTree = new kdTree<SphereCoords>(this.hexagons.sphereCoords, distance, ['phi', 'theta'])

    console.log('balance', this.kdTree.balanceFactor())

    this.testPoint = { phi: 0, theta: 0 }

    // const test = this.kdTree.nearest({ phi: 0, theta: 0, index: 0 }, 99, 200)

    // test.forEach(([coords, _]) => {
    //   this.setHexagonHeight(coords.index, 5)
    // })

    // Randomaize hexagon heights
    // for (let i = 0; i < this.hexagons.count; i++) {
    //   const scale = this.hexagons.scales[i]
    //   scale.y = Math.random() * 2
    //   this.hexagons.instance.setMatrixAt(i, new Three.Matrix4().compose(this.hexagons.positions[i], this.hexagons.rotations[i], scale))
    //   this.hexagons.instance.instanceMatrix.needsUpdate = true
    // }
  }

  dispose(): void {
    this.hexagons.instance.geometry.dispose()
    this.hexagons.instance.material.dispose()
  }

  private _setupHexagons(): Hexagons {
    const size = this.HexagonSize
    const height = this.HexagonHeight
    const count = Math.round(Math.pow(this.SphereSize / this.HexagonSize, 1.9))
    console.log(count)

    const geometry = new Three.CylinderGeometry(size, size, height, 6)
    const material = new Three.MeshStandardMaterial({ color: 0xff0000 })
    // const material = new Three.MeshStandardMaterial({ color: 0x2d3033 })
    const instance = new Three.InstancedMesh(geometry, material, count)
    const hexagons: Hexagons = {
      count: count,
      instance,
      positions: [],
      rotations: [],
      scales: [],
      sphereCoords: [],
    }
    
    // material.transparent = true
    // material.opacity = 0.7

    return hexagons
  }

  private _setupLayout(hexagons: Hexagons): void {
    const count = hexagons.count
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

      hexagons.positions.push(position)
      hexagons.rotations.push(rotation)
      hexagons.scales.push(scale)
      hexagons.sphereCoords.push({ phi, theta, index: i })

      console.log(i, phi, theta)

      matrix.compose(position, rotation, scale)
      hexagons.instance.setMatrixAt(i, matrix)
    }
  }

  getHexagonsInRadius(phi: number, theta: number, radius: number): number[] {
    return []
  }

  setHexagonHeight(index: number, height: number): void {
    const scale = this.hexagons.scales[index]
    scale.y = height

    const matrix = new Three.Matrix4().compose(this.hexagons.positions[index], this.hexagons.rotations[index], scale)
    this.hexagons.instance.setMatrixAt(index, matrix)
    this.hexagons.instance.instanceMatrix.needsUpdate = true
  }

  update(delta: number): void {
    this.testPoint.phi += Math.cos(delta) * 0.01
    this.testPoint.theta += Math.sin(delta) * 0.01

    this.testPoint.phi = ((this.testPoint.phi + Math.PI) % (2 * Math.PI)) - Math.PI
    this.testPoint.theta = ((this.testPoint.theta + Math.PI) % (2 * Math.PI)) - Math.PI

    // console.log(this.testPoint.phi)

    const nearest = this.kdTree.nearest({ phi: this.testPoint.phi, theta: this.testPoint.theta }, 200, 0.5)
    const missing = this.lastNearestCoords.filter(coords => !nearest.find(([c]) => c === coords))

    missing.forEach(coords => {
      this.setHexagonHeight(coords.index, 0.01)
    })

    // console.log(this.testPoint.x, nearest.length)
    nearest.forEach(([coords, distance], index) => {
      // if (index === 0) console.log(distance)

      this.setHexagonHeight(coords.index, 0.5 - distance * 2)
    })

    this.lastNearestCoords = nearest.map(([coords]) => coords)

    this.setHexagonHeight(0, 10)
    this.setHexagonHeight(this.hexagons.count - 1, 10)
  }
}
