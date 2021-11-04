// function start() {
//     fetch('/command', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//         body: JSON.stringify({
//         // your expected POST request payload goes here
//         command: "reset"
//         })
//     })
//     .then(res => res.json())
//     .then(game => {
//         // enter you logic when the fetch is successful
//         // loop over events and add them to display
//     })
//     .catch(error => {
//     // enter your logic for when there is an error (ex. error toast)
//         console.log(error)
//     })  
// }

function addChildren(child, placeId){
    place = document.getElementById(placeId);
    place.appendChild(child);
}

function removeChildren(whatChilds, placeId){
    let place = document.getElementById(placeId);
    // let child = document.getElementById(placeId).children;
    if(whatChilds === "all"){
        while (place.firstChild) {
            placeId.removeChild(place.lastChild);
        }
    }
    else if(whatChilds === "last"){
        place.removeChild(place.lastChild);
    }
    else if(whatChilds === "first"){
        place.removeChild(place.firstChild);
    }
    // else{
    //     place.removeChild(place.child[whatChilds]);
    // }
}

start();