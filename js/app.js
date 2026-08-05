let mapData = {}

const mapContainer = document.getElementById("map-container")
const buttons = document.querySelectorAll("#maps-menu button")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const mapName = button.dataset.map
        loadMap(mapName)
    })
})

function loadMap(mapName){
    mapContainer.innerHTML = `
        <div class="map-wrapper">
            <img 
                class="map-image"
                src="assets/maps/${mapName}/${mapName}.webp"
            >
            <svg
                class="map-overlay"
                viewBox="0 0 1024 1024">
            </svg>
        </div>

    `
    loadMapData(mapName)
}

function loadMapData(mapName){
    fetch(
        `assets/maps/${mapName}/${mapName}.json`
    ).then(response => {
        return response.json()
    }).then(data => {
        mapData = data
        createCallouts()
    }).catch(error => {
        console.error(
            "JSON loading error:",
            error
        )
    })
}

function createCallouts(){
    const svg = document.querySelector(".map-overlay")

    Object.entries(mapData.areas)
    .forEach(([id, area]) => {
        let shape
        if (area.shape.type === "polygon") {
            shape =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "polygon"
            )
            shape.setAttribute(
                "points",
                area.shape.points
            )
        }
        else if(area.shape.type === "rectangle"){
            shape = document.createElementNS("http://www.w3.org/2000/svg", "rect")

            shape.setAttribute("x", area.shape.x)
            shape.setAttribute("y", area.shape.y)
            shape.setAttribute("width", area.shape.width)
            shape.setAttribute("height",area.shape.height)
        }

        if (shape) {
            shape.classList.add("callout")
            shape.dataset.id = id
            shape.addEventListener("click", () => {
                selectCallout(shape)
                showInfo(id)
            })
            svg.appendChild(shape)
        }
    })
}

function selectCallout(selected){
    document.querySelectorAll(".callout").forEach(area => {
        area.classList.remove("selected")
    })
    selected.classList.add("selected")
}

function showInfo(id){
    const area = mapData.areas[id]

    if (!area) {
        return
    }

    document.getElementById("area-name").textContent = area.name
    document.getElementById("description").textContent = area.description
}

loadMap("mirage")