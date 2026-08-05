let drawing = false
let points = []

export function setupDrawing() {
    const drawButton = document.getElementById("draw-mode")
    const finishButton = document.getElementById("finish-shape")

    drawButton.addEventListener("click", () => {
        const svg = document.querySelector(".map-overlay")

        drawing = true
        points = []

        if (svg) {
            svg.classList.add("drawing")
        }

        console.log("Drawing mode enabled")
    })

    finishButton.addEventListener("click", () => {
        if (points.length < 3) {
            console.log("Need at least 3 points")
            return
        }

        console.log(points.join(" "))

        clearDrawing()

        const svg = document.querySelector(".map-overlay")

        if (svg) {
            svg.classList.remove("drawing")
        }

        drawing = false
    })
}

export function enableDrawing() {
    const svg = document.querySelector(".map-overlay")

    if (!svg) {
        return
    }

    svg.addEventListener("click", event => {
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
    })
}

function drawPolygon(svg) {
    let polygon = svg.querySelector(".drawing-polygon")

    if (!polygon) {
        polygon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
        )

        polygon.classList.add("drawing-polygon")

        svg.appendChild(polygon)
    }

    polygon.setAttribute(
        "points",
        points.join(" ")
    )
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