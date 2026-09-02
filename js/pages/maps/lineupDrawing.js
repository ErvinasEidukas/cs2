let drawing = false
let points = []

export function setupLineupDrawing() {
    const drawButton = document.getElementById("draw-lineup")
    const finishButton = document.getElementById("finish-lineup")

    if (!drawButton || !finishButton) {
        return
    }

    drawButton.addEventListener("click", startDrawing)
    finishButton.addEventListener("click", finishDrawing)
}

function startDrawing() {
    const svg = document.querySelector(".map-overlay")
    if (!svg) {
        return
    }

    drawing = true
    points = []

    const oldLine = svg.querySelector(".lineup-drawing")
    if (oldLine) {
        oldLine.remove()
    }

    svg.classList.add("lineup-drawing-mode")

    const button = document.getElementById("draw-lineup")
    if (button) {
        button.classList.add("active")
    }

    svg.addEventListener("click", handleMapClick)
}

function handleMapClick(event) {
    if (!drawing) {
        return
    }

    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()

    // Convert screen coordinates to 1024x1024 map coordinates.
    const x = Math.round((event.clientX - rect.left) * (1024 / rect.width))
    const y = Math.round((event.clientY - rect.top) * (1024 / rect.height))

    points.push({ x, y })

    drawPreview(svg)
}

function drawPreview(svg) {
    let polyline = svg.querySelector(".lineup-drawing")

    if (!polyline) {
        polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        polyline.classList.add("lineup-drawing")
        polyline.style.pointerEvents = "none"

        svg.appendChild(polyline)
    }

    polyline.setAttribute("points", points.map(point => `${point.x},${point.y}`).join(" "))
    drawPointMarkers(svg)
}

function drawPointMarkers(svg) {
    svg.querySelectorAll(".lineup-drawing-point").forEach(point => point.remove())

    points.forEach((point, index) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

        circle.setAttribute("cx", point.x)
        circle.setAttribute("cy", point.y)
        circle.setAttribute("r", "7")
        circle.classList.add("lineup-drawing-point")

        if (index === 0) {
            circle.classList.add("lineup-start")
        }

        if (index === points.length - 1) {
            circle.classList.add("lineup-end")
        }

        circle.style.pointerEvents = "none"

        svg.appendChild(circle)
    })
}

function finishDrawing() {
    if (!drawing) return

    if (points.length < 2) {
        console.log("Need at least 2 points.")
        return
    }

    const start = points[0]
    const end = points[points.length - 1]
    const bounces = points.slice(1, -1)

    const lineupData = {
        start,
        bounces,
        end
    }

    console.log(JSON.stringify(lineupData, null, 4))

    navigator.clipboard?.writeText(JSON.stringify(lineupData, null, 4)).then(() => {
        console.log("Lineup data copied to clipboard.")
    }).catch(() => console.log("Could not copy to clipboard."))

    clearLineupDrawing()
    stopDrawing()
}

function stopDrawing() {
    drawing = false

    const svg = document.querySelector(".map-overlay")

    if (svg) {
        svg.classList.remove("lineup-drawing-mode")
        svg.removeEventListener("click", handleMapClick)
    }

    const button = document.getElementById("draw-lineup")
    if (button) button.classList.remove("active")
}

export function clearLineupDrawing() {
    const svg = document.querySelector(".map-overlay")
    if (!svg) return

    svg.querySelectorAll(".lineup-drawing, .lineup-drawing-point").forEach(element => element.remove())

    points = []
}