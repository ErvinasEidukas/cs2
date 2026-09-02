import { setCalloutsEnabled } from "./callouts.js"

let drawing = false
let points = []

export function setupDrawing() {
    setupDrawButton()
    setupFinishButton()
}

export function enableDrawing() {
    const svg = document.querySelector(".map-overlay")

    if (!svg) {
        return
    }

    svg.addEventListener("click", event => {
        handleDrawingClick(svg, event)
    })
}

function setupDrawButton() {
    const drawButton = document.getElementById("draw-mode")

    drawButton.addEventListener("click", () => {
        drawButton.classList.add("active")

        drawing = true
        points = []

        const svg = document.querySelector(".map-overlay")

        if (svg) {
            svg.classList.add("drawing")
        }

        setCalloutsEnabled(false)
    })
}

function setupFinishButton() {
    const finishButton = document.getElementById("finish-shape")

    finishButton.addEventListener("click", async () => {
        const drawButton = document.getElementById("draw-mode")

        drawButton.classList.remove("active")

        if (points.length < 3) {
            console.log("Need at least 3 points")
            return
        }

        const polygonData = points.join(" ")

        console.log(polygonData)

        try {
            await navigator.clipboard.writeText(polygonData)
            console.log("Copied to clipboard")
        } catch (error) {
            console.error("Clipboard error:", error)
        }

        clearDrawing()

        const svg = document.querySelector(".map-overlay")

        if (svg) {
            svg.classList.remove("drawing")
        }

        setCalloutsEnabled(true)

        drawing = false
    })
}

function handleDrawingClick(svg, event) {
    if (!drawing) {
        return
    }

    const rect = svg.getBoundingClientRect()

    const x = Math.round(
        (event.clientX - rect.left) * (1024 / rect.width)
    )

    const y = Math.round(
        (event.clientY - rect.top) * (1024 / rect.height)
    )

    points.push(`${x},${y}`)

    drawPolygon(svg)
}

function drawPolygon(svg) {
    let polygon = svg.querySelector(".drawing-polygon")

    if (!polygon) {
        polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        polygon.classList.add("drawing-polygon")
        svg.appendChild(polygon)
    }

    polygon.setAttribute("points", points.join(" "))
}

function clearDrawing() {
    const svg = document.querySelector(".map-overlay")

    if (!svg) {
        return
    }

    const polygon = svg.querySelector(".drawing-polygon")

    if (polygon) {
        polygon.remove()
    }

    points = []
}