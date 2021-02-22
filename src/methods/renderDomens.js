import checkConnect from "../services/checkConnect"
import { colors } from "../services/colors"

export default function () {
  const shapes = this.shapesArr.filter((shape) => shape.value)

  const connected = shapes.filter((shape) => checkConnect(shape, shapes))

  let domensId = connected
    .map((a) => a.domen)
    .filter((a, b, arr) => arr.indexOf(a) === b)
    .sort((a, b) => a - b)

  console.log(domensId)

  this.shapesArr.forEach(
    (shape) => (shape.style.backgroundColor = "var(--light)")
  )
  connected.forEach(
    (shape) => (shape.style.backgroundColor = `var(${colors[shape.domen]}`)
  )
}
