const shapeWidth = 49
const h = 20

Vue.component("hexagon-row", {
  template: "#hexagon-holder",
})

const app = new Vue({
  el: "#root",
  methods: {
    renderHexagons: function () {
      let { sizeL, sizeM, sizeN } = this
      const countOfRows = sizeL + sizeM - 1

      const rowsArr = []
      let i = sizeL * -1
      let countsOfType = sizeN - 1

      for (let rowI = 0; rowI < countOfRows; rowI++) {
        let lefttoRight = rowI >= sizeL
        i++

        // cheta shlypa
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (rowI >= sizeM) {
          --countsOfType
        } else if (lefttoRight) {
          countsOfType
        } else ++countsOfType

        let countOfShapes = countsOfType

        const arrayLike = new Array(countOfShapes).fill("")

        const row = Array.from(arrayLike, (_, index) => {
          let offsetBetween = index * shapeWidth - index
          let offsetRow = (rowI * shapeWidth) / 2

          let offsetMRrow = lefttoRight ? i * shapeWidth : 0

          let offset = offsetBetween - offsetRow + offsetMRrow

          index = Math.abs(i) + index * 2

          return {
            row: rowI,
            index: index,
            id: rowI + ":" + index,
            value: null,
            domen: null,
            ltr: lefttoRight,
            style: {
              top: `${rowI * 32}px`,
              left: offset + `px`,
              backgroundColor: "var(--shape-bg-default)",
            },
          }
        })
        rowsArr.push(...row)
      }

      this.hexagonRows = rowsArr
    },

    changeValue: function (id) {
      const target = this.hexagonRows.find((shape) => shape.id === id)
      target.value = +!target.value
    },

    renderDomens: function () {
      const shapes = this.hexagonRows.filter((shape) => shape.value)
      let match = shapes.filter(checkConnect)

      console.log(match)

      match.forEach((shape) => (shape.style.backgroundColor = "red"))
    },
  },

  data: {
    sizeL: 3,
    sizeM: 5,
    sizeN: 7,
    hexagonRows: [],
  },
})

function checkConnect(shape, _, arr) {
  const notSame = (a, b) => a !== b

  const inOneRow = (a, b) =>
    a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2)

  const inOneCol = (a, b) =>
    (a.row === b.row + 1 || a.row === b.row - 1) &&
    (a.index === b.index + 1 || a.index === b.index - 1)

  return arr.some(
    (elem) =>
      notSame(elem, shape) && (inOneRow(elem, shape) || inOneCol(elem, shape))
  )
}
