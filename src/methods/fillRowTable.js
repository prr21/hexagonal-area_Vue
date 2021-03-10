export default function () {
  this.table.push({
    domensCount: this.domens.length,
    random: this.autoInp.random.value,
    shapes: this.shapesArr.filter((a) => a.value).length,
  })
}
