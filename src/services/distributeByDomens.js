import { colors } from "../services/colors"

export default function distributeByDomens(arr) {
  let unsorted = [...arr]
  let domens = []

  for (let domenId = 0; domenId <= unsorted.length; domenId++) {
    const shape = unsorted[domenId]

    const domen = renderDomen(shape)

    domens.push({
      shapes: domen,
      id: domenId,
      color: colors[domenId],
    })
  }

  function renderDomen(shp, chainArr = []) {
    let inOneChain = unsorted.filter(
      (elem) =>
        notSame(elem, shp) && (inOneRow(elem, shp) || inOneCol(elem, shp))
    )

    // If this chain initial
    if (chainArr.length === 0) {
      chainArr.push(shp)
      unsorted = unsorted.filter((b) => b !== shp)
    }
    //need to refactor

    inOneChain.forEach((shpInChain) => {
      chainArr.push(shpInChain)
      unsorted = unsorted.filter((b) => b !== shpInChain)

      renderDomen(shpInChain, chainArr)
    })

    return chainArr
  }

  return domens
}

const notSame = (a, b) => a !== b

const inOneRow = (a, b) =>
  a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2)

const inOneCol = (a, b) =>
  (a.row === b.row + 1 || a.row === b.row - 1) &&
  (a.index === b.index + 1 || a.index === b.index - 1)
