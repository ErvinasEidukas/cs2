import { getCookie } from "./helper.js"

let currentMap = null
let currentDebuts = []
let enabledDebuts = new Set()

export function loadDebutData(mapName) {
    currentMap = mapName
    currentDebuts = []
    enabledDebuts = new Set()

    const controls = document.getElementById("debuts-controls")
    const filters = document.getElementById("debuts-filters")

    if (!controls || !filters) {
        return
    }

    controls.classList.add("hidden")
    filters.innerHTML = ""

    fetch(`../assets/maps/${mapName}/debuts.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${mapName}/debuts.json`)
            }

            return response.json()
        })
        .then(data => {
            currentDebuts = data.debuts || []

            if (currentDebuts.length === 0) {
                enabledDebuts = new Set()
                controls.classList.add("hidden")

                document.dispatchEvent(
                    new CustomEvent("debutsLoaded")
                )

                return
            }

            controls.classList.remove("hidden")

            createDebutFilters()

            document.dispatchEvent(
                new CustomEvent("debutsLoaded")
            )
        })
        .catch(error => {
            console.error("Debut data loading error:", error)
            controls.classList.add("hidden")
        })
}

function getSavedDebuts() {
    const cookie = getCookie("lineupSettings")

    if (!cookie) {
        return null
    }

    try {
        const settings = JSON.parse(cookie)

        if (!settings || !settings[currentMap]) {
            return null
        }

        const mapSettings = settings[currentMap]

        if (!Array.isArray(mapSettings.debuts)) {
            return null
        }

        return mapSettings.debuts
    } catch (error) {
        console.error("Failed to parse lineup settings:", error)
        return null
    }
}

function createDebutFilters() {
    const filters = document.getElementById("debuts-filters")

    if (!filters) {
        return
    }

    filters.innerHTML = ""

    const savedDebuts = getSavedDebuts()

    if (savedDebuts !== null) {
        const validDebutIds = new Set(
            currentDebuts.map(debut => debut.id)
        )

        enabledDebuts = new Set(
            savedDebuts.filter(id => validDebutIds.has(id))
        )
    } else {
        enabledDebuts = new Set(
            currentDebuts.map(debut => debut.id)
        )
    }

    currentDebuts.forEach(debut => {
        const label = document.createElement("label")
        const checkbox = document.createElement("input")

        checkbox.type = "checkbox"
        checkbox.classList.add("debut-filter")
        checkbox.value = debut.id
        checkbox.checked = enabledDebuts.has(debut.id)

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                enabledDebuts.add(debut.id)
            } else {
                enabledDebuts.delete(debut.id)
            }

            document.dispatchEvent(
                new CustomEvent("debutsChanged")
            )
        })

        label.appendChild(checkbox)
        label.appendChild(
            document.createTextNode(debut.name)
        )

        filters.appendChild(label)
    })
}

export function getEnabledDebuts() {
    return [...enabledDebuts]
}

export function getCurrentDebuts() {
    return [...currentDebuts]
}

export function getDebutNades() {
    const result = []

    currentDebuts.forEach(debut => {
        if (!enabledDebuts.has(debut.id)) {
            return
        }

        if (!Array.isArray(debut.nades)) {
            return
        }

        debut.nades.forEach(nade => {
            result.push({
                grenadeId: nade.id,
                throwId: nade.throw
            })
        })
    })

    return result
}

export function setDebutSettings(debutIds = []) {
    enabledDebuts = new Set(debutIds)
}

export function getCurrentDebutMap() {
    return currentMap
}
