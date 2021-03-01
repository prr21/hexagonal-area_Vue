import validate from "../services/validate"
import { number } from "../services/random"

export default function () {
  if (!validate.randomInputs(this.autoInp)) return false

  const shapes = [...this.shapesArr]
  const chance = this.autoInp.random.value

  shapes.forEach((shp) => (shp.value = +(number() < chance)))
  this.renderDomens()
}
