import { createCallouts, resetPositionDescription } from "./callouts.js"
import { loadDebutData } from "./debuts.js"
import { setCurrentMap } from "./displayMode.js"
import { enableDrawing } from "./drawing.js"
import { loadGrenadeData } from "./grenades.js"
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

function setActiveMapButton(buttons, mapName) {
    buttons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.map === mapName
        )
    })
}

export function loadMap(mapName) {
    setCookie("selectedMap", mapName)
    const buttons = document.querySelectorAll("#maps-menu button")

    setActiveMapButton(buttons, mapName)

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
    setCurrentMap(mapName)

    loadMapCallouts(mapName)
    loadGrenadeData(mapName)
    loadDebutData(mapName)

    resetPositionDescription()
}

function loadMapCallouts(mapName) {
    fetch(`../assets/maps/${mapName}/${mapName}.json`).then(response => {
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
