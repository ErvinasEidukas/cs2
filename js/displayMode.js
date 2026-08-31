import { drawGrenades } from "./grenades.js"
import { setCookie, getCookie } from "./helper.js"
import { getEnabledDebuts } from "./debuts.js"

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

    enabledNadeTypes = new Set(
        mapSettings.types || []
    )

    enabledNadeSides = new Set(
        mapSettings.sides || []
    )
}

function setCalloutsVisibility(show) {
    document
        .querySelectorAll(".callout")
        .forEach(callout => {
            callout.style.display = show ? "" : "none"
        })
}

export function setupDisplayMode() {
    const calloutsRadio =
        document.getElementById("callouts-radio")

    const lineupsRadio =
        document.getElementById("lineups-radio")

    const calloutControls =
        document.getElementById("callout-controls")

    const lineupControls =
        document.getElementById("lineup-controls")

    const savedMode = getCookie("displayMode")

    if (savedMode === "lineups") {
        currentMode = "lineups"

        lineupsRadio.checked = true
        calloutsRadio.checked = false

        calloutControls.classList.add("hidden")
        lineupControls.classList.remove("hidden")
    } else {
        currentMode = "callouts"

        calloutsRadio.checked = true
        lineupsRadio.checked = false

        calloutControls.classList.remove("hidden")
        lineupControls.classList.add("hidden")
    }

    calloutsRadio.addEventListener("change", () => {
        if (!calloutsRadio.checked) {
            return
        }

        currentMode = "callouts"

        setCookie("displayMode", "callouts")

        calloutControls.classList.remove("hidden")
        lineupControls.classList.add("hidden")

        clearGrenades()
        setCalloutsVisibility(true)
    })

    lineupsRadio.addEventListener("change", () => {
        if (!lineupsRadio.checked) {
            return
        }

        currentMode = "lineups"

        setCookie("displayMode", "lineups")

        calloutControls.classList.add("hidden")
        lineupControls.classList.remove("hidden")

        setCalloutsVisibility(false)
        redrawGrenades()
    })

    document
        .querySelectorAll(".nade-filter")
        .forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const type = checkbox.value

                if (checkbox.checked) {
                    enabledNadeTypes.add(type)
                } else {
                    enabledNadeTypes.delete(type)
                }

                saveLineupSettings()

                if (currentMode === "lineups") {
                    redrawGrenades()
                }
            })
        })

    document
        .querySelectorAll(".nade-side-filter")
        .forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const side = checkbox.value

                if (checkbox.checked) {
                    enabledNadeSides.add(side)
                } else {
                    enabledNadeSides.delete(side)
                }

                saveLineupSettings()

                if (currentMode === "lineups") {
                    redrawGrenades()
                }
            })
        })

    document.addEventListener("debutsChanged", () => {
        saveLineupSettings()

        if (currentMode === "lineups") {
            redrawGrenades()
        }
    })

    document.addEventListener("debutsLoaded", () => {
        if (currentMode === "lineups") {
            redrawGrenades()
        }
    })

    setCalloutsVisibility(
        currentMode === "callouts"
    )
}

export function setCurrentMap(mapName) {
    currentMap = mapName

    loadLineupSettings(mapName)
    updateNadeCheckboxes()
}

function updateNadeCheckboxes() {
    document
        .querySelectorAll(".nade-filter")
        .forEach(checkbox => {
            checkbox.checked =
                enabledNadeTypes.has(checkbox.value)
        })

    document
        .querySelectorAll(".nade-side-filter")
        .forEach(checkbox => {
            checkbox.checked =
                enabledNadeSides.has(checkbox.value)
        })
}

function redrawGrenades() {
    drawGrenades(
        [...enabledNadeTypes],
        [...enabledNadeSides]
    )
}

function clearGrenades() {
    document
        .querySelectorAll(".grenade-trajectory")
        .forEach(element => {
            element.remove()
        })
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
