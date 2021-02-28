import distributeByDomens from "../services/distributeByDomens"

export default function () {
  window.prr = this.shapesArr
  const shapes = this.shapesArr.filter((shape) => shape.value)
  const domens = distributeByDomens(shapes)

  this.shapesArr.forEach(
    (shape) => (shape.style.backgroundColor = "var(--light)")
  )
  domens.forEach(setColors)
  this.domens = domens
}

function setColors({ shapes, color }) {
  shapes.forEach((shape) => (shape.style.backgroundColor = `var(${color})`))
}
