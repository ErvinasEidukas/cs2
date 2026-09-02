import { getDebutNades } from "./debuts.js"

const grenadeIcons = {
    smoke: "../assets/icons/grenades/smoke.svg",
    flash: "../assets/icons/grenades/flash.svg",
    molotov: "../assets/icons/grenades/molotov.svg",
    he: "../assets/icons/grenades/he.svg"
}

let currentMap = null
let currentEnabledTypes = []
let currentEnabledSides = []
let selectedLineupId = null
let selectedThrowId = null
let currentLineup = []

export function loadLineupData(mapName) {
    currentMap = mapName
    currentLineup = []

    selectedLineupId = null
    selectedThrowId = null

    fetch(`../assets/maps/${mapName}/lineup.json`).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load ${mapName}/lineup.json`)
        }

        return response.json()
    }).then(data => {
        currentLineup = data.grenades || []
        redrawCurrentLineup()
    }).catch(error => {
        console.error("Lineup data loading error:", error)
    })
}

export function drawLineups(enabledTypes = [], enabledSides = []) {
    currentEnabledTypes = [...enabledTypes]
    currentEnabledSides = [...enabledSides]

    const svg = document.querySelector(".map-overlay")

    if (!svg) {
        return
    }

    svg.querySelectorAll(".grenade-trajectory").forEach(element => element.remove())

    let visibleLineups = currentLineup.filter(grenade => {
        return enabledTypes.includes(grenade.type) && enabledSides.includes(grenade.side)
    })

    const debutNades = getDebutNades()

    const hasDebutFilter = debutNades.length > 0

    if (hasDebutFilter) {
        visibleLineups = visibleLineups.filter(grenade => {
            return debutNades.some(nade => nade.grenadeId === grenade.id)
        })
    }

    if (selectedLineupId) {
        visibleLineups = visibleLineups.filter(grenade => grenade.id === selectedLineupId)
    }

    visibleLineups.forEach(grenade => {
        const grenadeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        let visibleThrows = grenade.throws

        const loadIcons = () => {
            const icon = document.createElementNS("http://www.w3.org/2000/svg", "image")
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

        const loadPath = (throwData) => {
            const throwGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
            throwGroup.classList.add("grenade-throw")
            throwGroup.dataset.throwId = throwData.id

            const points = [
                throwData.start,
                ...(throwData.bounces || []),
                grenade.end
            ]

            const drawLine = (p1 ,p2) =>{
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
                line.setAttribute("x1", p1.x)
                line.setAttribute("y1", p1.y)
                line.setAttribute("x2", p2.x)
                line.setAttribute("y2", p2.y)

                line.classList.add("grenade-line")
                line.style.pointerEvents ="none"

                throwGroup.appendChild(line)
            }

            const drawLines = () => {
                for (let i = 0; i < points.length - 1; i++) {
                    const current = points[i]
                    const next = points[i + 1]

                    drawLine(current, next)
                }
            }

            const drawStartPoint = () => {
                const startPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle")

                startPoint.setAttribute("cx", throwData.start.x)
                startPoint.setAttribute("cy", throwData.start.y)
                startPoint.setAttribute("r", "9")
                startPoint.classList.add("grenade-start")
                if (
                    selectedLineupId === grenade.id &&
                    selectedThrowId === throwData.id
                ) {
                    startPoint.classList.add("selected")
                }

                startPoint.style.pointerEvents = "auto"

                startPoint.addEventListener("click", event => {
                    event.stopPropagation()
                    selectGrenadeThrow(grenade, throwData)
                })

                throwGroup.appendChild(startPoint)
            }

            const drawBouncePoints = () => {
                const bouncePoints = throwData.bounces || []
                bouncePoints.forEach(bounce => {
                    const bounceDot = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                    bounceDot.setAttribute("cx", bounce.x)
                    bounceDot.setAttribute("cy", bounce.y)
                    bounceDot.setAttribute("r","6")
                    bounceDot.classList.add("grenade-bounce")
                    bounceDot.style.pointerEvents ="none"

                    throwGroup.appendChild(bounceDot)
                })
            }

            drawLines()
            drawStartPoint()
            drawBouncePoints()

            grenadeGroup.appendChild(throwGroup)
        }

        grenadeGroup.classList.add("grenade-trajectory", `grenade-${grenade.type}`)
        grenadeGroup.dataset.grenadeId = grenade.id

        if (hasDebutFilter) {
            visibleThrows = grenade.throws.filter(throwData => {
                return debutNades.some(nade => {
                    return nade.grenadeId === grenade.id && nade.throwId === throwData.id
                })
            })
        }

        visibleThrows.forEach(throwData => {
            loadPath(throwData)
        })

        if (visibleThrows.length === 0) {
            return
        }

        const iconPath = grenadeIcons[grenade.type]

        if (iconPath) {
            loadIcons()
        }

        svg.appendChild(grenadeGroup)
    })
}

function redrawCurrentLineup() {
    drawLineups(currentEnabledTypes, currentEnabledSides)
}

function selectGrenadeLineup(grenade) {
    selectedLineupId = grenade.id
    selectedThrowId = null

    showGrenadeIconInfo()
    redrawCurrentLineup()
}

function selectGrenadeThrow(grenade, throwData) {
    selectedLineupId = grenade.id
    selectedThrowId = throwData.id

    showThrowInfo(grenade, throwData)
    redrawCurrentLineup()
}

function showGrenadeIconInfo() {
    const title = document.getElementById("info-title")
    const description = document.getElementById("info-description")

    title.innerHTML = "Grenade lineup"
    description.innerHTML = `
        <div>Select starting position to view throw details</div>
        <button id="deselect-grenade">
            Show All Nades
        </button>
    `
    setupDeselectButton()
}

function showThrowInfo(grenade, throwData) {
    const title = document.getElementById("info-title")
    const description = document.getElementById("info-description")

    title.textContent = "Grenade lineup"

    description.innerHTML = `
        <h3>${grenade.name}</h3>
        <div>Type: ${throwData.type}</div>

        <div id="lineup-images" class="lineup-images"></div>

        <button id="deselect-grenade">
            Show All Nades
        </button>
    `

    showThrowImages(throwData.image)
    setupDeselectButton()
}

function showThrowImages(images) {
    const imageContainer = document.getElementById("lineup-images")

    if (!imageContainer) {
        return
    }

    if (!Array.isArray(images) || images.length === 0) {
        return
    }

    images.forEach(imageName => {
        const image = document.createElement("img")

        image.src = `../assets/maps/${currentMap}/grenades/images/${imageName}`
        image.alt = "Grenade lineup"
        image.classList.add("lineup-image")

        image.addEventListener("click", () => {
            openImagePopup(image.src, image.alt)
        })

        imageContainer.appendChild(image)
    })
}

function setupDeselectButton() {
    const button = document.getElementById("deselect-grenade")

    if (!button) {
        return
    }

    button.addEventListener("click", deselectLineup)
}

function openImagePopup(src, alt = "Grenade lineup") {
    const existingPopup = document.getElementById("image-popup")

    if (existingPopup) {
        existingPopup.remove()
    }

    const popup = document.createElement("div")

    popup.id = "image-popup"
    popup.classList.add("image-popup")

    const image = document.createElement("img")

    image.src = src
    image.alt = alt
    image.classList.add("image-popup-content")

    const closeButton = document.createElement("button")

    closeButton.classList.add("image-popup-close")
    closeButton.textContent = "×"
    closeButton.setAttribute("aria-label", "Close image")

    closeButton.addEventListener("click", event => {
        event.stopPropagation()
        closeImagePopup()
    })

    popup.addEventListener("click", event => {
        if (event.target === popup) {
            closeImagePopup()
        }
    })

    popup.appendChild(image)
    popup.appendChild(closeButton)

    document.body.appendChild(popup)
    document.body.style.overflow = "hidden"
}

export function resetLineupDescription() {
    const title = document.getElementById("info-title")
    const description = document.getElementById("info-description")

    title.innerHTML = "Grenade lineup"
    description.innerHTML = "Select starting position to view throw details"
}

function closeImagePopup() {
    const popup = document.getElementById("image-popup")

    if (popup) {
        popup.remove()
    }

    document.body.style.overflow = ""
}

function deselectLineup() {
    selectedLineupId = null
    selectedThrowId = null
    resetLineupDescription()
    redrawCurrentLineup()
}