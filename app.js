const colors = document.styleSheets[0].rules[0].style

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
    },

    changeValue: function (id) {
      const target = this.shapesArr.find((shape) => shape.id === id)
      target.value = +!target.value
    },

    renderDomens: function () {
      const shapes = this.shapesArr.filter((shape) => shape.value)

      const connected = shapes.filter((shape) => checkConnect(shape, shapes))

      let domensId = connected
        .map((a) => a.domen)
        .filter((a, b, arr) => arr.indexOf(a) === b)
        .sort((a, b) => a - b)

      console.log(domensId)

      this.shapesArr.forEach(
        (shape) => (shape.style.backgroundColor = "var(--light)")
      )
      connected.forEach(
        (shape) => (shape.style.backgroundColor = `var(${colors[shape.domen]}`)
      )
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
    shapesArr: JSON.parse(
      `[{"row":0,"index":2,"id":"0:2","value":1,"domen":null,"style":{"top":"0px","left":"0px","backgroundColor":"var(--white)"}},{"row":0,"index":4,"id":"0:4","value":null,"domen":null,"style":{"top":"0px","left":"48px","backgroundColor":"var(--white)"}},{"row":0,"index":6,"id":"0:6","value":null,"domen":null,"style":{"top":"0px","left":"96px","backgroundColor":"var(--white)"}},{"row":0,"index":8,"id":"0:8","value":null,"domen":null,"style":{"top":"0px","left":"144px","backgroundColor":"var(--white)"}},{"row":0,"index":10,"id":"0:10","value":null,"domen":null,"style":{"top":"0px","left":"192px","backgroundColor":"var(--white)"}},{"row":0,"index":12,"id":"0:12","value":1,"domen":null,"style":{"top":"0px","left":"240px","backgroundColor":"var(--white)"}},{"row":0,"index":14,"id":"0:14","value":null,"domen":null,"style":{"top":"0px","left":"288px","backgroundColor":"var(--white)"}},{"row":1,"index":1,"id":"1:1","value":1,"domen":null,"style":{"top":"33px","left":"-24.5px","backgroundColor":"var(--white)"}},{"row":1,"index":3,"id":"1:3","value":1,"domen":null,"style":{"top":"33px","left":"23.5px","backgroundColor":"var(--white)"}},{"row":1,"index":5,"id":"1:5","value":null,"domen":null,"style":{"top":"33px","left":"71.5px","backgroundColor":"var(--white)"}},{"row":1,"index":7,"id":"1:7","value":1,"domen":null,"style":{"top":"33px","left":"119.5px","backgroundColor":"var(--white)"}},{"row":1,"index":9,"id":"1:9","value":null,"domen":null,"style":{"top":"33px","left":"167.5px","backgroundColor":"var(--white)"}},{"row":1,"index":11,"id":"1:11","value":null,"domen":null,"style":{"top":"33px","left":"215.5px","backgroundColor":"var(--white)"}},{"row":1,"index":13,"id":"1:13","value":null,"domen":null,"style":{"top":"33px","left":"263.5px","backgroundColor":"var(--white)"}},{"row":1,"index":15,"id":"1:15","value":1,"domen":null,"style":{"top":"33px","left":"311.5px","backgroundColor":"var(--white)"}},{"row":2,"index":0,"id":"2:0","value":null,"domen":null,"style":{"top":"66px","left":"-49px","backgroundColor":"var(--white)"}},{"row":2,"index":2,"id":"2:2","value":null,"domen":null,"style":{"top":"66px","left":"-1px","backgroundColor":"var(--white)"}},{"row":2,"index":4,"id":"2:4","value":null,"domen":null,"style":{"top":"66px","left":"47px","backgroundColor":"var(--white)"}},{"row":2,"index":6,"id":"2:6","value":null,"domen":null,"style":{"top":"66px","left":"95px","backgroundColor":"var(--white)"}},{"row":2,"index":8,"id":"2:8","value":1,"domen":null,"style":{"top":"66px","left":"143px","backgroundColor":"var(--white)"}},{"row":2,"index":10,"id":"2:10","value":null,"domen":null,"style":{"top":"66px","left":"191px","backgroundColor":"var(--white)"}},{"row":2,"index":12,"id":"2:12","value":null,"domen":null,"style":{"top":"66px","left":"239px","backgroundColor":"var(--white)"}},{"row":2,"index":14,"id":"2:14","value":null,"domen":null,"style":{"top":"66px","left":"287px","backgroundColor":"var(--white)"}},{"row":2,"index":16,"id":"2:16","value":null,"domen":null,"style":{"top":"66px","left":"335px","backgroundColor":"var(--white)"}},{"row":3,"index":1,"id":"3:1","value":1,"domen":null,"style":{"top":"99px","left":"-24.5px","backgroundColor":"var(--white)"}},{"row":3,"index":3,"id":"3:3","value":1,"domen":null,"style":{"top":"99px","left":"23.5px","backgroundColor":"var(--white)"}},{"row":3,"index":5,"id":"3:5","value":null,"domen":null,"style":{"top":"99px","left":"71.5px","backgroundColor":"var(--white)"}},{"row":3,"index":7,"id":"3:7","value":1,"domen":null,"style":{"top":"99px","left":"119.5px","backgroundColor":"var(--white)"}},{"row":3,"index":9,"id":"3:9","value":null,"domen":null,"style":{"top":"99px","left":"167.5px","backgroundColor":"var(--white)"}},{"row":3,"index":11,"id":"3:11","value":1,"domen":null,"style":{"top":"99px","left":"215.5px","backgroundColor":"var(--white)"}},{"row":3,"index":13,"id":"3:13","value":null,"domen":null,"style":{"top":"99px","left":"263.5px","backgroundColor":"var(--white)"}},{"row":3,"index":15,"id":"3:15","value":1,"domen":null,"style":{"top":"99px","left":"311.5px","backgroundColor":"var(--white)"}},{"row":3,"index":17,"id":"3:17","value":null,"domen":null,"style":{"top":"99px","left":"359.5px","backgroundColor":"var(--white)"}},{"row":4,"index":2,"id":"4:2","value":1,"domen":null,"style":{"top":"132px","left":"0px","backgroundColor":"var(--white)"}},{"row":4,"index":4,"id":"4:4","value":null,"domen":null,"style":{"top":"132px","left":"48px","backgroundColor":"var(--white)"}},{"row":4,"index":6,"id":"4:6","value":1,"domen":null,"style":{"top":"132px","left":"96px","backgroundColor":"var(--white)"}},{"row":4,"index":8,"id":"4:8","value":null,"domen":null,"style":{"top":"132px","left":"144px","backgroundColor":"var(--white)"}},{"row":4,"index":10,"id":"4:10","value":null,"domen":null,"style":{"top":"132px","left":"192px","backgroundColor":"var(--white)"}},{"row":4,"index":12,"id":"4:12","value":null,"domen":null,"style":{"top":"132px","left":"240px","backgroundColor":"var(--white)"}},{"row":4,"index":14,"id":"4:14","value":null,"domen":null,"style":{"top":"132px","left":"288px","backgroundColor":"var(--white)"}},{"row":4,"index":16,"id":"4:16","value":null,"domen":null,"style":{"top":"132px","left":"336px","backgroundColor":"var(--white)"}},{"row":4,"index":18,"id":"4:18","value":1,"domen":null,"style":{"top":"132px","left":"384px","backgroundColor":"var(--white)"}},{"row":5,"index":3,"id":"5:3","value":null,"domen":null,"style":{"top":"165px","left":"24.5px","backgroundColor":"var(--white)"}},{"row":5,"index":5,"id":"5:5","value":1,"domen":null,"style":{"top":"165px","left":"72.5px","backgroundColor":"var(--white)"}},{"row":5,"index":7,"id":"5:7","value":1,"domen":null,"style":{"top":"165px","left":"120.5px","backgroundColor":"var(--white)"}},{"row":5,"index":9,"id":"5:9","value":1,"domen":null,"style":{"top":"165px","left":"168.5px","backgroundColor":"var(--white)"}},{"row":5,"index":11,"id":"5:11","value":null,"domen":null,"style":{"top":"165px","left":"216.5px","backgroundColor":"var(--white)"}},{"row":5,"index":13,"id":"5:13","value":null,"domen":null,"style":{"top":"165px","left":"264.5px","backgroundColor":"var(--white)"}},{"row":5,"index":15,"id":"5:15","value":null,"domen":null,"style":{"top":"165px","left":"312.5px","backgroundColor":"var(--white)"}},{"row":5,"index":17,"id":"5:17","value":null,"domen":null,"style":{"top":"165px","left":"360.5px","backgroundColor":"var(--white)"}},{"row":6,"index":4,"id":"6:4","value":1,"domen":null,"style":{"top":"198px","left":"49px","backgroundColor":"var(--white)"}},{"row":6,"index":6,"id":"6:6","value":null,"domen":null,"style":{"top":"198px","left":"97px","backgroundColor":"var(--white)"}},{"row":6,"index":8,"id":"6:8","value":null,"domen":null,"style":{"top":"198px","left":"145px","backgroundColor":"var(--white)"}},{"row":6,"index":10,"id":"6:10","value":null,"domen":null,"style":{"top":"198px","left":"193px","backgroundColor":"var(--white)"}},{"row":6,"index":12,"id":"6:12","value":1,"domen":null,"style":{"top":"198px","left":"241px","backgroundColor":"var(--white)"}},{"row":6,"index":14,"id":"6:14","value":null,"domen":null,"style":{"top":"198px","left":"289px","backgroundColor":"var(--white)"}},{"row":6,"index":16,"id":"6:16","value":1,"domen":null,"style":{"top":"198px","left":"337px","backgroundColor":"var(--white)"}}]`
    ),
    domens: [],
  },
})

function checkConnect(shape, arr) {
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

app.renderDomens()
