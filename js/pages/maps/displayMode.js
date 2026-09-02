import { drawLineups, resetLineupDescription } from "./lineup.js"
import { setCookie, getCookie } from "./helper.js"
import { getEnabledDebuts } from "./debuts.js"
import { resetPositionDescription } from "./callouts.js"

let currentMode = "callouts"
let currentMap = null

let enabledNadeTypes = new Set([
    "smoke",
    "flash",
    "molotov",
    "he"
])

let enabledNadeSides = new Set([
    "ct",
    "t"
])

export function setupDisplayMode() {
    const elements = getDisplayModeElements()
    const savedMode = getCookie("displayMode") || "callouts"

    setupInitialDisplayMode(elements, savedMode)
    setupDisplayModeListeners(elements)

    addEventListenerNadeFilterChange()
    addEventListenerNadeSideFilter()
    addEventListenerDebutsChanged()
    addEventListenerDebutsLoaded()

    setCalloutsVisibility(currentMode === "callouts")
}

export function setCurrentMap(mapName) {
    currentMap = mapName
}

export function handleLineupControlsData() {
    loadLineupSettings(currentMap)
    updateNadeCheckboxes()
}

export function getCurrentMode() {
    return currentMode
}

export function getEnabledNadeTypes() {
    return [...enabledNadeTypes]
}

export function getEnabledNadeSides() {
    return [...enabledNadeSides]
}

function getLineupSettings() {
    const cookie = getCookie("lineupSettings")

    if (!cookie) {
        return {}
    }

    try {
        return JSON.parse(cookie)
    } catch (error) {
        console.error("Failed to parse lineup settings:", error)
        return {}
    }
}

function saveLineupSettings() {
    if (!currentMap) {
        return
    }

    const settings = getLineupSettings()

    settings[currentMap] = {
        sides: [...enabledNadeSides],
        types: [...enabledNadeTypes],
        debuts: getEnabledDebuts()
    }

    setCookie(
        "lineupSettings",
        JSON.stringify(settings)
    )
}

function loadLineupSettings(mapName) {
    const settings = getLineupSettings()
    const mapSettings = settings[mapName]

    if (!mapSettings) {
        enabledNadeTypes = new Set([
            "smoke",
            "flash",
            "molotov",
            "he"
        ])

        enabledNadeSides = new Set([
            "ct",
            "t"
        ])

        return
    }

    enabledNadeTypes = new Set(mapSettings.types || [])
    enabledNadeSides = new Set(mapSettings.sides || [])
}

function setCalloutsVisibility(show) {
    document.querySelectorAll(".callout").forEach(callout => {
        callout.style.display = show ? "" : "none"
    })
}

function getDisplayModeElements() {
    return {
        calloutsRadio: document.getElementById("callouts-radio"),
        lineupsRadio: document.getElementById("lineups-radio"),
        calloutControls: document.getElementById("callout-controls"),
        lineupControls: document.getElementById("lineup-controls")
    }
}

function setupInitialDisplayMode(elements, mode) {
    if (mode === "lineups") {
        showLineupsMode(elements)
    } else {
        showCalloutsMode(elements)
    }
}

function setupDisplayModeListeners(elements) {
    elements.calloutsRadio.addEventListener("change", () => {
        if (!elements.calloutsRadio.checked) {
            return
        }

        showCalloutsMode(elements)
    })

    elements.lineupsRadio.addEventListener("change", () => {
        if (!elements.lineupsRadio.checked) {
            return
        }

        showLineupsMode(elements)
    })
}

function showCalloutsMode(elements) {
    currentMode = "callouts"

    setCookie("displayMode", "callouts")

    elements.calloutsRadio.checked = true
    elements.lineupsRadio.checked = false

    elements.calloutControls.classList.remove("hidden")
    elements.lineupControls.classList.add("hidden")

    clearGrenades()
    setCalloutsVisibility(true)
    resetPositionDescription()
}

function showLineupsMode(elements) {
    currentMode = "lineups"

    setCookie("displayMode", "lineups")

    elements.calloutsRadio.checked = false
    elements.lineupsRadio.checked = true

    elements.calloutControls.classList.add("hidden")
    elements.lineupControls.classList.remove("hidden")

    setCalloutsVisibility(false)
    redrawLineups()
    resetLineupDescription()
}

function addEventListenerNadeFilterChange() {
    document.querySelectorAll(".nade-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const type = checkbox.value

            if (checkbox.checked) {
                enabledNadeTypes.add(type)
            } else {
                enabledNadeTypes.delete(type)
            }

            saveLineupSettings()
            if (currentMode === "lineups") {
                redrawLineups()
            }
        })
    })
}

function addEventListenerNadeSideFilter() {
    document.querySelectorAll(".nade-side-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const side = checkbox.value

            if (checkbox.checked) {
                enabledNadeSides.add(side)
            } else {
                enabledNadeSides.delete(side)
            }

            saveLineupSettings()
            if (currentMode === "lineups") {
                redrawLineups()
            }
        })
    })
}

function addEventListenerDebutsChanged() {
    document.addEventListener("debutsChanged", () => {
        saveLineupSettings()

        if (currentMode === "lineups") {
            redrawLineups()
        }
    })
}

function addEventListenerDebutsLoaded() {
    document.addEventListener("debutsLoaded", () => {
        if (currentMode === "lineups") {
            redrawLineups()
        }
    })
}

function updateNadeCheckboxes() {
    document.querySelectorAll(".nade-filter").forEach(checkbox => {
        checkbox.checked = enabledNadeTypes.has(checkbox.value)
    })

    document.querySelectorAll(".nade-side-filter").forEach(checkbox => {
        checkbox.checked = enabledNadeSides.has(checkbox.value)
    })
}

function redrawLineups() {
    drawLineups(
        [...enabledNadeTypes],
        [...enabledNadeSides]
    )
}

function clearGrenades() {
    document.querySelectorAll(".grenade-trajectory").forEach(element => {
        element.remove()
    })
}