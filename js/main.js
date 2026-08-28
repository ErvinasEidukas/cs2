import { loadMap, setupMapButtons } from "./maps.js"
import { setupDrawing } from "./drawing.js"
import { setupDisplayMode } from "./displayMode.js"
import { setupLineupDrawing } from "./lineupDrawing.js"

setupMapButtons()
setupDrawing()
setupDisplayMode()
setupLineupDrawing()

loadMap("mirage")