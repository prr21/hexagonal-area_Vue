export default function () {
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
}
