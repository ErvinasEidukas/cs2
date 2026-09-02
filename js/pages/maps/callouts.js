import { getCookie } from "./helper.js"

let mapData = {}
let calloutsEnabled = true

export function setCalloutsEnabled(value) {
    calloutsEnabled = value

    document.querySelectorAll(".callout")
        .forEach(callout => {
            callout.style.pointerEvents = value ? "auto" : "none"
        })
}

export function createCallouts(data) {
    mapData = data

    const svg = document.querySelector(".map-overlay")
    const mode = getCookie("displayMode") || "callouts"

    Object.entries(data.areas).forEach(([id, area]) => {
        let shape

        if (area.shape.type === "polygon") {
            shape = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "polygon"
            )

            shape.setAttribute("points", area.shape.points)
        }

        if (area.shape.type === "rectangle") {
            shape = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            )

            shape.setAttribute("x", area.shape.x)
            shape.setAttribute("y", area.shape.y)
            shape.setAttribute("width", area.shape.width)
            shape.setAttribute("height", area.shape.height)
        }

        if (!shape) {
            return
        }

        shape.classList.add("callout")
        shape.dataset.id = id

        if (mode !== "callouts") {
            shape.style.display = "none"
        }

        shape.addEventListener("click", () => {
            if (!calloutsEnabled) {
                return
            }

            selectCallout(shape)
            showInfo(id)
        })

        svg.appendChild(shape)
    })
}

function selectCallout(selected) {
    document.querySelectorAll(".callout")
        .forEach(area => {
            area.classList.remove("selected")
        })

    selected.classList.add("selected")
}

function showInfo(id) {
    const area = mapData.areas[id]

    if (!area) {
        return
    }

    const title = document.getElementById("info-title")
    const description = document.getElementById("info-description")

    title.innerHTML = "Area callout"
    description.innerHTML = `
        <div>${area.name}</div>
        ${area.ru ? `<div>${area.ru}</div>` : ""}
    `
}

export function resetPositionDescription() {
    const title = document.getElementById("info-title")
    const description = document.getElementById("info-description")

    title.innerHTML = "Area callout"
    description.innerHTML = "Click a position"
}