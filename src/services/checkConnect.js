export default function checkConnect(shape, arr) {
  const notSame = (a, b) => a !== b

  const inOneRow = (a, b) =>
    a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2)

  const inOneCol = (a, b) =>
    (a.row === b.row + 1 || a.row === b.row - 1) &&
    (a.index === b.index + 1 || a.index === b.index - 1)

  const giveDomenId = (a, b) => {
    let domenId = a.domen ? a.domen : b.domen ? b.domen : dmId++

    a.domen = domenId
    b.domen = domenId
  }

  return arr.some((elem) => {
    if (
      notSame(elem, shape) &&
      (inOneRow(elem, shape) || inOneCol(elem, shape))
    ) {
      giveDomenId(elem, shape)
      return true
    }
  })
}

let dmId = 1
