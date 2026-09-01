import { loadMap, setupMapButtons } from "./maps.js"
import { setupDrawing } from "./drawing.js"
import { setupDisplayMode } from "./displayMode.js"
import { setupLineupDrawing } from "./lineupDrawing.js"
import { getCookie } from "./helper.js"

main()

function main() {
    setupEventListeners()
    loadPage()
    removeLoadingAnimation()
}

function setupEventListeners() {
    setupMapButtons()
    setupDrawing()
    setupDisplayMode()
    setupLineupDrawing()
}

function loadPage() {
    const savedMap = getCookie("selectedMap") || "mirage"
    loadMap(savedMap)
}

function removeLoadingAnimation() {
    document.body.classList.remove("loading")
}
