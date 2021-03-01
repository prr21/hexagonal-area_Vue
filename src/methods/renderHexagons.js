import validate from "../services/validate"

// have to refactor
export default function () {
  if (!validate.areaInputs(this.areaInp)) return

  const shapeWidth = this.shape.width - 1
  const shapeHeight = this.shape.height

  const L = Number(this.areaInp.L.size),
    M = Number(this.areaInp.M.size),
    N = Number(this.areaInp.N.size)

  const countOfRows = L + M - 1
  const rowsArr = []

  let i = L * -1
  let countOfShapes = N - 1

  for (let rowI = 0; rowI < countOfRows; rowI++) {
    let leftToRight = rowI >= L
    i++

    if (leftToRight) {
      countOfShapes
    } else countOfShapes++

    if (rowI >= M) --countOfShapes

    const arrayLike = new Array(countOfShapes).fill("")

    const row = Array.from(arrayLike, (_, index) => {
      let offsetBetween = index * shapeWidth - index
      let offsetRow = (rowI * shapeWidth) / 2

      let offsetMRrow = leftToRight ? i * shapeWidth : 0

      let offset = offsetBetween - offsetRow + offsetMRrow

      index = Math.abs(i) + index * 2

      return {
        row: rowI,
        index: index,
        id: rowI + ":" + index,
        value: null,
        style: {
          top: `${rowI * 32 + rowI}px`, // change static 32
          left: offset + `px`,
          backgroundColor: "",
        },
      }
    })
    rowsArr.push(...row)
  }

  this.shapesArr = rowsArr
}
