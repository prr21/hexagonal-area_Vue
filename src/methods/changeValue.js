export default function (id) {
  const target = this.shapesArr.find((shape) => shape.id === id)
  target.value = +!target.value
}
