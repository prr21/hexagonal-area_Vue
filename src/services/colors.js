import { numberByRange } from "./random"

// bootstrap :root colors
export const rootColors = document.styleSheets[0].rules[0].style

export const randomColor = () => "#" + numberByRange(0, 16777215).toString(16)
