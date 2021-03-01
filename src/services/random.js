export const number = () => Math.random()

export const numberByRange = (min = 0, max = 10) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
