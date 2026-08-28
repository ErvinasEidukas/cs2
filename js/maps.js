import { createCallouts, resetPositionDescription } from "./callouts.js"
import { enableDrawing } from "./drawing.js"
import { setCurrentMap } from "./displayMode.js"
import { loadGrenadeData } from "./grenades.js"

let mapData = {}

export function setupMapButtons() {
    const buttons = document.querySelectorAll("#maps-menu button")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const mapName = button.dataset.map

            loadMap(mapName)
            setActiveMapButton(buttons, mapName)
        })
    })
}

function setActiveMapButton(buttons, mapName) {
    buttons.forEach(button => {
        if (button.dataset.map === mapName) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })
}

export function loadMap(mapName) {
    const mapContainer = document.getElementById("map-container")

    mapContainer.innerHTML = `
        <div class="map-wrapper">
            <img
                class="map-image"
                src="../assets/maps/${mapName}/${mapName}.webp"
            >
            <svg
                class="map-overlay"
                viewBox="0 0 1024 1024"
            ></svg>
        </div>
    `

    enableDrawing()
    loadMapData(mapName)
    loadGrenadeData(mapName)
    resetPositionDescription()
    setCurrentMap(mapName)
}

function loadMapData(mapName) {
    fetch(`../assets/maps/${mapName}/${mapName}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${mapName}.json`)
            }

            return response.json()
        })
        .then(data => {
            mapData = data
            createCallouts(mapData)
        })
        .catch(error => {
            console.error("JSON loading error:", error)
        })
}