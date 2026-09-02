import { setupDisplayMode } from "./displayMode.js"
import { setupDrawing } from "./drawing.js"
import { getCookie } from "./helper.js"
import { setupLineupDrawing } from "./lineupDrawing.js"
import { loadMap, setupMapButtons } from "./maps.js"

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
