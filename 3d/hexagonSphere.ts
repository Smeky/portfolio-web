import * as Three from 'three'

type Hexagons = {
  count: number
  instance: Three.InstancedMesh
  positions: Three.Vector3[]
  rotations: Three.Quaternion[]
  scales: Three.Vector3[]
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

  constructor() {
    super()

    this.hexagons = this._setupHexagons()
    this._setupLayout(this.hexagons)
    this.add(this.hexagons.instance)

    // Randomaize hexagon heights
    for (let i = 0; i < this.hexagons.count; i++) {
      const scale = this.hexagons.scales[i]
      scale.y = Math.random() * 2
      this.hexagons.instance.setMatrixAt(i, new Three.Matrix4().compose(this.hexagons.positions[i], this.hexagons.rotations[i], scale))
      this.hexagons.instance.instanceMatrix.needsUpdate = true
    }
  }

  private _setupHexagons(): Hexagons {
    const size = this.HexagonSize
    const height = this.HexagonHeight
    const count = Math.pow(this.SphereSize / this.HexagonSize, 1.9)

    const geometry = new Three.CylinderGeometry(size, size, height, 6)
    const material = new Three.MeshStandardMaterial({ color: 0x2d3033 })
    const instance = new Three.InstancedMesh(geometry, material, count)
    const hexagons: Hexagons = {
      count: count,
      instance,
      positions: [],
      rotations: [],
      scales: []
    }
    
    material.transparent = true
    material.opacity = 0.7

    return hexagons
  }

  private _setupLayout(hexagons: Hexagons): void {
    const count = hexagons.count
    const matrix = new Three.Matrix4()

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * i / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const position = new Three.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
      )

      const rotation = new Three.Quaternion().setFromUnitVectors(new Three.Vector3(0, 1, 0), position.clone().normalize())
      const scale = new Three.Vector3(1, 1, 1)

      hexagons.positions.push(position)
      hexagons.rotations.push(rotation)
      hexagons.scales.push(scale)

      matrix.compose(position, rotation, new Three.Vector3(1, 1, 1))
      hexagons.instance.setMatrixAt(i, matrix)
    }
  }

  update(delta: number): void {

  }
}
