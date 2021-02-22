import renderHexagons from "./methods/renderHexagons"
import changeValue from "./methods/changeValue"
import renderDomens from "./methods/renderDomens"
import validateAreas from "./methods/validateAreas"

// todo: dynamic center margin

// eslint-disable-next-line no-undef
const app = new Vue({
  el: "#root",
  methods: {
    renderHexagons,
    changeValue,
    renderDomens,
    validateAreas,
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
      `[{"row":0,"index":2,"id":"0:2","value":1,"domen":null,"style":{"top":"0px","left":"0px","backgroundColor":"var(--light)"}},{"row":0,"index":4,"id":"0:4","value":null,"domen":null,"style":{"top":"0px","left":"48px","backgroundColor":"var(--light)"}},{"row":0,"index":6,"id":"0:6","value":null,"domen":null,"style":{"top":"0px","left":"96px","backgroundColor":"var(--light)"}},{"row":0,"index":8,"id":"0:8","value":null,"domen":null,"style":{"top":"0px","left":"144px","backgroundColor":"var(--light)"}},{"row":0,"index":10,"id":"0:10","value":null,"domen":null,"style":{"top":"0px","left":"192px","backgroundColor":"var(--light)"}},{"row":0,"index":12,"id":"0:12","value":1,"domen":null,"style":{"top":"0px","left":"240px","backgroundColor":"var(--light)"}},{"row":0,"index":14,"id":"0:14","value":null,"domen":null,"style":{"top":"0px","left":"288px","backgroundColor":"var(--light)"}},{"row":1,"index":1,"id":"1:1","value":1,"domen":null,"style":{"top":"33px","left":"-24.5px","backgroundColor":"var(--light)"}},{"row":1,"index":3,"id":"1:3","value":1,"domen":null,"style":{"top":"33px","left":"23.5px","backgroundColor":"var(--light)"}},{"row":1,"index":5,"id":"1:5","value":null,"domen":null,"style":{"top":"33px","left":"71.5px","backgroundColor":"var(--light)"}},{"row":1,"index":7,"id":"1:7","value":1,"domen":null,"style":{"top":"33px","left":"119.5px","backgroundColor":"var(--light)"}},{"row":1,"index":9,"id":"1:9","value":null,"domen":null,"style":{"top":"33px","left":"167.5px","backgroundColor":"var(--light)"}},{"row":1,"index":11,"id":"1:11","value":null,"domen":null,"style":{"top":"33px","left":"215.5px","backgroundColor":"var(--light)"}},{"row":1,"index":13,"id":"1:13","value":null,"domen":null,"style":{"top":"33px","left":"263.5px","backgroundColor":"var(--light)"}},{"row":1,"index":15,"id":"1:15","value":1,"domen":null,"style":{"top":"33px","left":"311.5px","backgroundColor":"var(--light)"}},{"row":2,"index":0,"id":"2:0","value":null,"domen":null,"style":{"top":"66px","left":"-49px","backgroundColor":"var(--light)"}},{"row":2,"index":2,"id":"2:2","value":null,"domen":null,"style":{"top":"66px","left":"-1px","backgroundColor":"var(--light)"}},{"row":2,"index":4,"id":"2:4","value":null,"domen":null,"style":{"top":"66px","left":"47px","backgroundColor":"var(--light)"}},{"row":2,"index":6,"id":"2:6","value":null,"domen":null,"style":{"top":"66px","left":"95px","backgroundColor":"var(--light)"}},{"row":2,"index":8,"id":"2:8","value":1,"domen":null,"style":{"top":"66px","left":"143px","backgroundColor":"var(--light)"}},{"row":2,"index":10,"id":"2:10","value":null,"domen":null,"style":{"top":"66px","left":"191px","backgroundColor":"var(--light)"}},{"row":2,"index":12,"id":"2:12","value":null,"domen":null,"style":{"top":"66px","left":"239px","backgroundColor":"var(--light)"}},{"row":2,"index":14,"id":"2:14","value":null,"domen":null,"style":{"top":"66px","left":"287px","backgroundColor":"var(--light)"}},{"row":2,"index":16,"id":"2:16","value":null,"domen":null,"style":{"top":"66px","left":"335px","backgroundColor":"var(--light)"}},{"row":3,"index":1,"id":"3:1","value":1,"domen":null,"style":{"top":"99px","left":"-24.5px","backgroundColor":"var(--light)"}},{"row":3,"index":3,"id":"3:3","value":1,"domen":null,"style":{"top":"99px","left":"23.5px","backgroundColor":"var(--light)"}},{"row":3,"index":5,"id":"3:5","value":null,"domen":null,"style":{"top":"99px","left":"71.5px","backgroundColor":"var(--light)"}},{"row":3,"index":7,"id":"3:7","value":1,"domen":null,"style":{"top":"99px","left":"119.5px","backgroundColor":"var(--light)"}},{"row":3,"index":9,"id":"3:9","value":null,"domen":null,"style":{"top":"99px","left":"167.5px","backgroundColor":"var(--light)"}},{"row":3,"index":11,"id":"3:11","value":1,"domen":null,"style":{"top":"99px","left":"215.5px","backgroundColor":"var(--light)"}},{"row":3,"index":13,"id":"3:13","value":null,"domen":null,"style":{"top":"99px","left":"263.5px","backgroundColor":"var(--light)"}},{"row":3,"index":15,"id":"3:15","value":1,"domen":null,"style":{"top":"99px","left":"311.5px","backgroundColor":"var(--light)"}},{"row":3,"index":17,"id":"3:17","value":null,"domen":null,"style":{"top":"99px","left":"359.5px","backgroundColor":"var(--light)"}},{"row":4,"index":2,"id":"4:2","value":1,"domen":null,"style":{"top":"132px","left":"0px","backgroundColor":"var(--light)"}},{"row":4,"index":4,"id":"4:4","value":null,"domen":null,"style":{"top":"132px","left":"48px","backgroundColor":"var(--light)"}},{"row":4,"index":6,"id":"4:6","value":1,"domen":null,"style":{"top":"132px","left":"96px","backgroundColor":"var(--light)"}},{"row":4,"index":8,"id":"4:8","value":null,"domen":null,"style":{"top":"132px","left":"144px","backgroundColor":"var(--light)"}},{"row":4,"index":10,"id":"4:10","value":null,"domen":null,"style":{"top":"132px","left":"192px","backgroundColor":"var(--light)"}},{"row":4,"index":12,"id":"4:12","value":null,"domen":null,"style":{"top":"132px","left":"240px","backgroundColor":"var(--light)"}},{"row":4,"index":14,"id":"4:14","value":null,"domen":null,"style":{"top":"132px","left":"288px","backgroundColor":"var(--light)"}},{"row":4,"index":16,"id":"4:16","value":null,"domen":null,"style":{"top":"132px","left":"336px","backgroundColor":"var(--light)"}},{"row":4,"index":18,"id":"4:18","value":1,"domen":null,"style":{"top":"132px","left":"384px","backgroundColor":"var(--light)"}},{"row":5,"index":3,"id":"5:3","value":null,"domen":null,"style":{"top":"165px","left":"24.5px","backgroundColor":"var(--light)"}},{"row":5,"index":5,"id":"5:5","value":1,"domen":null,"style":{"top":"165px","left":"72.5px","backgroundColor":"var(--light)"}},{"row":5,"index":7,"id":"5:7","value":1,"domen":null,"style":{"top":"165px","left":"120.5px","backgroundColor":"var(--light)"}},{"row":5,"index":9,"id":"5:9","value":1,"domen":null,"style":{"top":"165px","left":"168.5px","backgroundColor":"var(--light)"}},{"row":5,"index":11,"id":"5:11","value":null,"domen":null,"style":{"top":"165px","left":"216.5px","backgroundColor":"var(--light)"}},{"row":5,"index":13,"id":"5:13","value":null,"domen":null,"style":{"top":"165px","left":"264.5px","backgroundColor":"var(--light)"}},{"row":5,"index":15,"id":"5:15","value":null,"domen":null,"style":{"top":"165px","left":"312.5px","backgroundColor":"var(--light)"}},{"row":5,"index":17,"id":"5:17","value":null,"domen":null,"style":{"top":"165px","left":"360.5px","backgroundColor":"var(--light)"}},{"row":6,"index":4,"id":"6:4","value":1,"domen":null,"style":{"top":"198px","left":"49px","backgroundColor":"var(--light)"}},{"row":6,"index":6,"id":"6:6","value":null,"domen":null,"style":{"top":"198px","left":"97px","backgroundColor":"var(--light)"}},{"row":6,"index":8,"id":"6:8","value":null,"domen":null,"style":{"top":"198px","left":"145px","backgroundColor":"var(--light)"}},{"row":6,"index":10,"id":"6:10","value":null,"domen":null,"style":{"top":"198px","left":"193px","backgroundColor":"var(--light)"}},{"row":6,"index":12,"id":"6:12","value":1,"domen":null,"style":{"top":"198px","left":"241px","backgroundColor":"var(--light)"}},{"row":6,"index":14,"id":"6:14","value":null,"domen":null,"style":{"top":"198px","left":"289px","backgroundColor":"var(--light)"}},{"row":6,"index":16,"id":"6:16","value":1,"domen":null,"style":{"top":"198px","left":"337px","backgroundColor":"var(--light)"}}]`
    ),
    domens: [],
  },
})

export default app
