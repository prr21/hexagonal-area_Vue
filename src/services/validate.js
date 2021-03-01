// have to refactor
export default {
  areaInputs: function (data) {
    const inputs = data
    let validForm = true

    for (const inp in inputs) {
      const fields = inputs[inp]

      if (fields.size > 30) {
        setStatus(fields, false, "Значение не может быть больше 30!")
      } else if (fields.size < 1) {
        setStatus(fields, false, "Значение не может быть меньше 1!")
      } else {
        setStatus(fields, true)
      }
      if (!fields.valid) validForm = false
    }

    return validForm
  },

  randomInputs: function (data) {
    const inputs = data
    let validForm = true

    for (const inp in inputs) {
      const fields = inputs[inp]

      if (fields.value > 0.99 || fields.value < 0.01) {
        setStatus(fields, false, "0.01 – 0.99!")
      } else {
        setStatus(fields, true)
      }

      if (!fields.valid) validForm = false
    }

    return validForm
  },
}

function setStatus(fields, status, msg = "") {
  fields.message = msg
  fields.valid = status
}
