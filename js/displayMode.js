import { drawGrenades, loadGrenadeData } from "./grenades.js"

let currentMode = "callouts"
let enabledNadeTypes = new Set(["smoke", "flash", "molotov"])

function setCalloutsVisibility(show) {
    document.querySelectorAll(".callout").forEach(callout => {
        callout.style.display = show ? "" : "none"
    })
}

export function setupDisplayMode() {
    const calloutsRadio = document.getElementById("callouts-radio")
    const lineupsRadio = document.getElementById("lineups-radio")
    const calloutControls = document.getElementById("callout-controls")
    const lineupControls = document.getElementById("lineup-controls")

    calloutsRadio.addEventListener("change", () => {
        if (!calloutsRadio.checked) return

        currentMode = "callouts"
        calloutControls.classList.remove("hidden")
        lineupControls.classList.add("hidden")

        clearGrenades()
        setCalloutsVisibility(true)
    })

    lineupsRadio.addEventListener("change", () => {
        if (!lineupsRadio.checked) return

        currentMode = "lineups"
        calloutControls.classList.add("hidden")
        lineupControls.classList.remove("hidden")

        setCalloutsVisibility(false)
        redrawGrenades()
    })

    document.querySelectorAll(".nade-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const type = checkbox.value

            if (checkbox.checked) {
                enabledNadeTypes.add(type)
            } else {
                enabledNadeTypes.delete(type)
            }

            if (currentMode === "lineups") {
                redrawGrenades()
            }
        })
    })
}

export function setCurrentMap(mapName) {
    if (currentMode === "lineups") {
        loadGrenadeData(mapName)
    }
}

function redrawGrenades() {
    drawGrenades([...enabledNadeTypes])
}

function clearGrenades() {
    document.querySelectorAll(".grenade-trajectory").forEach(element => element.remove())
}

export function getCurrentMode() {
    return currentMode
}

export function getEnabledNadeTypes() {
    return [...enabledNadeTypes]
}