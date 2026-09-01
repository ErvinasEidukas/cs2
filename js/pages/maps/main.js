import { loadMap, setupMapButtons } from "./maps.js"
import { setupDrawing } from "./drawing.js"
import { setupDisplayMode } from "./displayMode.js"
import { setupLineupDrawing } from "./lineupDrawing.js"
import { getCookie } from "./helper.js"

setupMapButtons()
setupDrawing()
setupDisplayMode()
setupLineupDrawing()

const savedMap = getCookie("selectedMap") || "mirage"

loadMap(savedMap)

document.body.classList.remove("loading")