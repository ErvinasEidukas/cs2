const grenadeIcons = {
    smoke: "../assets/icons/grenades/smoke.svg",
    flash: "../assets/icons/grenades/flash.svg",
    molotov: "../assets/icons/grenades/molotov.svg",
    he: "../assets/icons/grenades/he.svg"
}

let currentMap = null
let currentEnabledTypes = []
let currentEnabledSides = []
let selectedGrenadeId = null
let selectedThrowId = null
let currentGrenades = []

export function loadGrenadeData(mapName) {
    currentMap = mapName
    currentGrenades = []

    selectedGrenadeId = null
    selectedThrowId = null

    fetch(`../assets/maps/${mapName}/grenades.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${mapName}/grenades.json`)
            }

            return response.json()
        })
        .then(data => {
            currentGrenades = data.grenades || []
            redrawCurrentGrenades()
        })
        .catch(error => {
            console.error("Grenade data loading error:", error)
        })
}

function redrawCurrentGrenades() {
    drawGrenades(currentEnabledTypes, currentEnabledSides)
}

export function drawGrenades(enabledTypes = [], enabledSides = []) {
    currentEnabledTypes = [...enabledTypes]
    currentEnabledSides = [...enabledSides]

    const svg = document.querySelector(".map-overlay")
    if (!svg) {
        return
    }

    svg.querySelectorAll(".grenade-trajectory")
        .forEach(element => element.remove())

    let visibleGrenades = currentGrenades.filter(
        grenade => enabledTypes.includes(grenade.type) && enabledSides.includes(grenade.side)
    )

    if (selectedGrenadeId) {
        visibleGrenades = visibleGrenades.filter(
            grenade => grenade.id === selectedGrenadeId
        )
    }

    visibleGrenades.forEach(grenade => {
        const grenadeGroup = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        )

        grenadeGroup.classList.add(
            "grenade-trajectory",
            `grenade-${grenade.type}`
        )

        grenadeGroup.dataset.grenadeId = grenade.id

        grenade.throws.forEach(throwData => {
            const throwGroup = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            )

            throwGroup.classList.add("grenade-throw")
            throwGroup.dataset.throwId = throwData.id

            const points = [
                throwData.start,
                ...(throwData.bounces || []),
                grenade.end
            ]

            for (let i = 0; i < points.length - 1; i++) {
                const current = points[i]
                const next = points[i + 1]

                const line = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                )

                line.setAttribute("x1", current.x)
                line.setAttribute("y1", current.y)
                line.setAttribute("x2", next.x)
                line.setAttribute("y2", next.y)
                line.classList.add("grenade-line")
                line.style.pointerEvents = "none"

                throwGroup.appendChild(line)
            }

            const startDot = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            )

            startDot.setAttribute("cx", throwData.start.x)
            startDot.setAttribute("cy", throwData.start.y)
            startDot.setAttribute("r", "9")
            startDot.classList.add("grenade-start")

            if (
                selectedGrenadeId === grenade.id &&
                selectedThrowId === throwData.id
            ) {
                startDot.classList.add("selected")
            }

            startDot.style.pointerEvents = "auto"

            startDot.addEventListener("click", event => {
                event.stopPropagation()
                selectGrenadeThrow(grenade, throwData)
            })

            throwGroup.appendChild(startDot)

            ;(throwData.bounces || []).forEach(bounce => {
                const bounceDot = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                )

                bounceDot.setAttribute("cx", bounce.x)
                bounceDot.setAttribute("cy", bounce.y)
                bounceDot.setAttribute("r", "6")
                bounceDot.classList.add("grenade-bounce")
                bounceDot.style.pointerEvents = "none"

                throwGroup.appendChild(bounceDot)
            })

            grenadeGroup.appendChild(throwGroup)
        })

        const iconPath = grenadeIcons[grenade.type]

        if (iconPath) {
            const icon = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "image"
            )

            const iconSize = 40

            icon.setAttribute("x", grenade.end.x - iconSize / 2)
            icon.setAttribute("y", grenade.end.y - iconSize / 2)
            icon.setAttribute("width", iconSize)
            icon.setAttribute("height", iconSize)
            icon.setAttribute("href", iconPath)

            icon.classList.add("grenade-end-icon")
            icon.style.pointerEvents = "auto"

            icon.addEventListener("click", event => {
                event.stopPropagation()
                selectGrenadeLineup(grenade)
            })

            grenadeGroup.appendChild(icon)
        }

        svg.appendChild(grenadeGroup)
    })
}

function selectGrenadeLineup(grenade) {
    selectedGrenadeId = grenade.id
    selectedThrowId = null

    showGrenadeInfo(grenade)
    redrawCurrentGrenades()
}

function selectGrenadeThrow(grenade, throwData) {
    selectedGrenadeId = grenade.id
    selectedThrowId = throwData.id

    showThrowInfo(grenade, throwData)
    redrawCurrentGrenades()
}

function showGrenadeInfo(grenade) {
    const title = document.getElementById("area-name")
    const subtitle = document.getElementById("area-name-ru")

    if (!title) return

    title.textContent = grenade.name

    if (subtitle) {
        subtitle.textContent = "Select a starting position"
    }

    addDeselectButton()
}

function showThrowInfo(grenade, throwData) {
    const title = document.getElementById("area-name")
    const subtitle = document.getElementById("area-name-ru")

    if (!title) return

    title.textContent = throwData.name || grenade.name

    if (subtitle) {
        subtitle.textContent = "Type: " + throwData.type
    }

    showThrowImages(throwData.image)
    addDeselectButton()
}

function showThrowImages(images) {
    if (!Array.isArray(images) || images.length === 0) {
        return
    }

    const infoPanel = document.getElementById("info-panel")

    if (!infoPanel) {
        return
    }

    const imageContainer = document.createElement("div")

    imageContainer.id = "lineup-images"
    imageContainer.classList.add("lineup-images")

    images.forEach(imageName => {
        const image = document.createElement("img")

        image.src =
            `../assets/maps/${currentMap}/grenades/images/${imageName}`

        image.alt = "Grenade lineup"
        image.classList.add("lineup-image")

        image.addEventListener("click", () => {
            openImagePopup(image.src, image.alt)
        })

        imageContainer.appendChild(image)
    })

    infoPanel.appendChild(imageContainer)
}

function openImagePopup(src, alt = "Grenade lineup") {
    const existingPopup =
        document.getElementById("image-popup")

    if (existingPopup) {
        existingPopup.remove()
    }

    const popup =
        document.createElement("div")

    popup.id = "image-popup"
    popup.classList.add("image-popup")

    const image =
        document.createElement("img")

    image.src = src
    image.alt = alt
    image.classList.add("image-popup-content")

    const closeButton =
        document.createElement("button")

    closeButton.classList.add("image-popup-close")
    closeButton.textContent = "×"
    closeButton.setAttribute(
        "aria-label",
        "Close image"
    )

    closeButton.addEventListener(
        "click",
        event => {
            event.stopPropagation()
            closeImagePopup()
        }
    )

    popup.addEventListener(
        "click",
        event => {
            if (event.target === popup) {
                closeImagePopup()
            }
        }
    )

    popup.appendChild(image)
    popup.appendChild(closeButton)

    document.body.appendChild(popup)

    document.body.style.overflow = "hidden"
}

function closeImagePopup() {
    const popup =
        document.getElementById("image-popup")

    if (popup) {
        popup.remove()
    }

    document.body.style.overflow = ""
}

function addDeselectButton() {
    const infoPanel = document.getElementById("info-panel")
    if (!infoPanel) return

    if (document.getElementById("deselect-grenade")) return

    const button = document.createElement("button")

    button.id = "deselect-grenade"
    button.textContent = "Show All Nades"
    button.addEventListener("click", deselectGrenade)

    infoPanel.appendChild(button)
}

function deselectGrenade() {
    selectedGrenadeId = null
    selectedThrowId = null

    const button = document.getElementById("deselect-grenade")
    if (button) button.remove()

    const images = document.querySelector(".lineup-images")
    if (images) images.remove()

    const title = document.getElementById("area-name")
    const subtitle = document.getElementById("area-name-ru")

    if (title) title.textContent = "Select a grenade"
    if (subtitle) subtitle.textContent = ""

    redrawCurrentGrenades()
}