Vue.component("hexagon-row", {
  template: "#hexagon-holder",
})

// todo: dynamic center margin

const app = new Vue({
  el: "#root",
  methods: {
    renderHexagons: function () {
      if (!this.validateAreas()) return

      const shapeWidth = this.shape.width - 1
      const shapeHeight = this.shape.height

      const L = Number(this.area.L.size),
        M = Number(this.area.M.size),
        N = Number(this.area.N.size)

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
            domen: null,
            ltr: leftToRight,
            style: {
              top: `${rowI * 32 + rowI}px`, // change static 32
              left: offset + `px`,
              backgroundColor: "var(--white)",
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

      match.forEach((shape) => (shape.style.backgroundColor = "var(--red)"))
    },

    validateAreas: function () {
      const area = this.area
      let valid = true

      for (const region in area) {
        const field = area[region]

        if (field.size > 30) {
          setValidStatus(field, false, "Значение не может быть больше 30!")
        } else if (field.size < 1) {
          setValidStatus(field, false, "Значение не может быть меньше 1!")
        } else {
          setValidStatus(field, true)
        }
      }
      return valid

      function setValidStatus(field, status, msg = "") {
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
    shape: {
      width: 50,
      height: 20,
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
