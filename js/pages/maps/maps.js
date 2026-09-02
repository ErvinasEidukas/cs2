import { createCallouts, resetPositionDescription } from "./callouts.js"
import { loadDebutData } from "./debuts.js"
import { handleLineupControlsData, setCurrentMap } from "./displayMode.js"
import { enableDrawing } from "./drawing.js"
import { loadLineupData } from "./lineup.js"
import { setCookie } from "./helper.js"

let mapData = {}

export function setupMapButtons() {
    const buttons = document.querySelectorAll("#maps-menu button")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const mapName = button.dataset.map
            loadMap(mapName)
        })
    })
}

export function loadMap(mapName) {
    setCookie("selectedMap", mapName)
    setActiveMapButton(mapName)

    loadMapImage(mapName)

    enableDrawing()
    setCurrentMap(mapName)
    handleLineupControlsData()

    loadMapCallouts(mapName)
    loadLineupData(mapName)
    loadDebutData(mapName)

    resetPositionDescription()
}

function setActiveMapButton(mapName) {
    const buttons = document.querySelectorAll("#maps-menu button")
    buttons.forEach(button => {
        button.classList.toggle("active", button.dataset.map === mapName)
    })
}

function loadMapImage(mapName) {
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
}

function loadMapCallouts(mapName) {
    fetch(`../assets/maps/${mapName}/callouts.json`).then(response => {
        if (!response.ok) {
            throw new Error(
                `Failed to load ${mapName}.json`
            )
        }
        return response.json()
    }).then(data => {
        mapData = data
        createCallouts(mapData)
    }).catch(error => {
        console.error(
            "JSON loading error:",
            error
        )
    })
}
