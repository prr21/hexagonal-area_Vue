import { rootColors, randomColor } from "../services/colors"

export default function distributeByDomens(arr) {
  const domens = []
  let restShapes = [...arr]

  while (restShapes.length) {
    const shape = restShapes[0]
    const domen = defineChainByShape(shape)

    if (domen.length > 1) {
      domens.push({
        shapes: domen,
        id: domens.length,
        // color: `var(${rootColors[domens.length]}`,
        color: randomColor(),
      })
    }
  }

  return domens

  function defineChainByShape(shp, chain = []) {
    chain.push(shp)

    // looking for connect with nearby shapes
    let nearShps = restShapes.filter(
      (elem) =>
        notSame(elem, shp) && (inOneRow(elem, shp) || inOneCol(elem, shp))
    )

    // update arr by removing used shapes
    restShapes = removeElemFromArr(shp, restShapes)

    // repeat unti chain connection ends
    nearShps.forEach((shpInChain) => {
      defineChainByShape(shpInChain, chain)
    })

    return chain
  }
}

const removeElemFromArr = (elem, arr) =>
  arr.filter((item) => notSame(item, elem))

const notSame = (a, b) => a !== b

const inOneRow = (a, b) =>
  a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2)

const inOneCol = (a, b) =>
  (a.row === b.row + 1 || a.row === b.row - 1) &&
  (a.index === b.index + 1 || a.index === b.index - 1)
