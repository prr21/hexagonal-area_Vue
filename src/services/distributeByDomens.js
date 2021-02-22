import { colors } from "../services/colors"

export default function distributeByDomens(arr) {
  let unsorted = [...arr]
  let domens = []

  for (let domenId = 0; domenId <= unsorted.length; domenId++) {
    console.log(unsorted.lenght)
    const shape = unsorted[domenId]
    console.log(domenId)
    let domen = renderDomen(shape, [])

    domens.push({
      shapes: domen,
      id: domenId,
      color: colors[domenId],
    })
  }

  function renderDomen(shp, arr) {
    let conShapesArr = unsorted.filter(
      (elem) =>
        notSame(elem, shp) && (inOneRow(elem, shp) || inOneCol(elem, shp))
    )
    let conShape = conShapesArr[0] // todo distrib by arr not by one

    if (conShape) {
      if (arr.length === 0) {
        arr.push(shp)
        unsorted = unsorted.filter((b) => b !== shp)
      }

      arr.push(conShape)
      unsorted = unsorted.filter((b) => b !== conShape)

      renderDomen(conShape, arr)
    }
    return arr
  }

  return domens
}

const notSame = (a, b) => a !== b

const inOneRow = (a, b) =>
  a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2)

const inOneCol = (a, b) =>
  (a.row === b.row + 1 || a.row === b.row - 1) &&
  (a.index === b.index + 1 || a.index === b.index - 1)
