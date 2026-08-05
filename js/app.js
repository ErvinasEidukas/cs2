const callouts = document.querySelectorAll(".callout");

callouts.forEach(area => {

    area.addEventListener("click", () => {


        // remove old selection

        callouts.forEach(item => {

            item.classList.remove("selected");

        });


        // select clicked area

        area.classList.add("selected");


        // get area name

        const id =
            area.dataset.id;


        showInfo(id);


    });

});


function showInfo(id){
    const data = {

        connector: {

            name:"Connector",

            description:
            "Connects Mid to A Site."

        },


        window: {

            name:"Window",

            description:
            "Important AWP position overlooking Mid."

        }

    };


    document.getElementById("area-name")
        .textContent =
        data[id].name;


    document.getElementById("description")
        .textContent =
        data[id].description;

}