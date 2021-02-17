const shapeWidth = 49
const h = 20

Vue.component("hexagon-row", {
  template: "#hexagon-holder",
})

const app = new Vue({
  el: "#root",
  methods: {
    renderHexagons: function () {
      if (!this.validateAreas()) return

      let L = Number(this.area.L.size),
        M = Number(this.area.M.size),
        N = Number(this.area.N.size)

      const countOfRows = L + M - 1

      const rowsArr = []
      let i = L * -1
      let countsOfType = N - 1

      for (let rowI = 0; rowI < countOfRows; rowI++) {
        let lefttoRight = rowI >= L
        i++

        // cheta shlypa
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (rowI >= M) {
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

    validateAreas: function () {
      const area = this.area
      let valid = true

      for (const region in area) {
        const field = area[region]

        if (field.size > 30) {
          toggleValid(field, false, "Значение не может быть больше 30!")
        } else if (field.size < 1) {
          toggleValid(field, false, "Значение не может быть меньше 1!")
        } else {
          toggleValid(field, true)
        }
      }
      return valid

      function toggleValid(field, status, msg) {
        field.message = msg
        field.valid = status

        if (!status) valid = false
      }
    },
  },

  data: {
    area: {
      L: {
        size: 3,
        valid: true,
        message: "",
      },
      M: {
        size: 5,
        valid: true,
        message: "",
      },
      N: {
        size: 7,
        valid: true,
        message: "",
      },
    },
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
