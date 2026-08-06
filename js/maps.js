import { createCallouts, resetPositionDescription } from "./callouts.js"
import { enableDrawing } from "./drawing.js"

let mapData = {}

export function setupMapButtons() {
    const buttons = document.querySelectorAll("#maps-menu button")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            loadMap(button.dataset.map)
        })
    })
}

export function loadMap(mapName) {
    const mapContainer = document.getElementById("map-container")

    mapContainer.innerHTML = `
        <div class="map-wrapper">
            <img class="map-image" src="assets/maps/${mapName}/${mapName}.webp">
            <svg class="map-overlay" viewBox="0 0 1024 1024"></svg>
        </div>
    `

    enableDrawing()
    loadMapData(mapName)
    resetPositionDescription()
}

function loadMapData(mapName) {
    fetch(`assets/maps/${mapName}/${mapName}.json`)
        .then(response => response.json())
        .then(data => {
            mapData = data
            createCallouts(mapData)
        })
        .catch(error => {
            console.error("JSON loading error:", error)
        })
}