import { drawGrenades, loadGrenadeData } from "./grenades.js"
import { setCookie, getCookie } from "./helper.js"

let currentMode = "callouts"

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

    // =========================
    // RESTORE SAVED SETTINGS
    // =========================

    const savedMode = getCookie("displayMode")

    const savedNadeTypes = getCookie("nadeTypes")
    const savedNadeSides = getCookie("nadeSides")

    // Restore display mode

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

    // Restore grenade types
    if (savedNadeTypes !== null) {

        enabledNadeTypes = new Set(
            savedNadeTypes
                .split(",")
                .filter(type => type)
        )

    }

    // Restore grenade sides
    if (savedNadeSides !== null) {

        enabledNadeSides = new Set(
            savedNadeSides
                .split(",")
                .filter(side => side)
        )

    }

    // Update checkbox UI
    document.querySelectorAll(".nade-filter").forEach(checkbox => {
        checkbox.checked = enabledNadeTypes.has(checkbox.value)
    })

    document.querySelectorAll(".nade-side-filter").forEach(checkbox => {
        checkbox.checked = enabledNadeSides.has(checkbox.value)
    })

    // =========================
    // RADIO BUTTONS
    // =========================
    calloutsRadio.addEventListener("change", () => {

        if (!calloutsRadio.checked) return

        currentMode = "callouts"

        setCookie("displayMode", "callouts")

        calloutControls.classList.remove("hidden")
        lineupControls.classList.add("hidden")

        clearGrenades()
        setCalloutsVisibility(true)
    })

    lineupsRadio.addEventListener("change", () => {

        if (!lineupsRadio.checked) return

        currentMode = "lineups"

        setCookie("displayMode", "lineups")

        calloutControls.classList.add("hidden")
        lineupControls.classList.remove("hidden")

        setCalloutsVisibility(false)
        redrawGrenades()
    })

    // =========================
    // GRENADE TYPE CHECKBOXES
    // =========================
    document.querySelectorAll(".nade-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const type = checkbox.value

            if (checkbox.checked) {
                enabledNadeTypes.add(type)
            } else {
                enabledNadeTypes.delete(type)
            }

            // Save to cookie
            setCookie(
                "nadeTypes",
                [...enabledNadeTypes].join(",")
            )

            if (currentMode === "lineups") {
                redrawGrenades()
            }
        })
    })

    // =========================
    // CT / T CHECKBOXES
    // =========================
    document.querySelectorAll(".nade-side-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const side = checkbox.value

            if (checkbox.checked) {
                enabledNadeSides.add(side)
            } else {
                enabledNadeSides.delete(side)
            }

            // Save to cookie
            setCookie(
                "nadeSides",
                [...enabledNadeSides].join(",")
            )

            if (currentMode === "lineups") {
                redrawGrenades()
            }
        })
    })

    // =========================
    // INITIAL DISPLAY
    // =========================
    if (currentMode === "callouts") {
        setCalloutsVisibility(true)
    } else {
        setCalloutsVisibility(false)
        redrawGrenades()
    }
}

export function setCurrentMap(mapName) {
    if (currentMode === "lineups") {
        loadGrenadeData(mapName)
    }
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
        .forEach(element => element.remove())
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