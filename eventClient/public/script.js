function start() {
    fetch('/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(events => {
            console.log(events);
            let params = new URLSearchParams(document.location.search.substring(1));
            let eventId = params.get("event");
            for (newEvent of events) {
                let li = listItem(anchor(newEvent.name, "/?event=" + newEvent.id));
                addChildren(li, "events");
                if (eventId === newEvent.id) {
                    let info = [listItem(newEvent.name), listItem(newEvent.date), listItem(newEvent.time), listItem(newEvent.duration)];
                    addChildren(info, "eventDetails")
                }
            }

            // enter you logic when the fetch is successful
            // loop over events and add them to display
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function anchor(name, url) {
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.text = name;
    return anchor;
}


function listItem(child) {
    console.log(typeof child);
    let li = document.createElement('li');
    if (typeof child === "string") {
        li.innerText = child;
    }
    else {
        li.appendChild(child);
    }
    return li;
}

function addChildren(children, placeId) {
    place = document.getElementById(placeId);
    
    if (Array.isArray(children)) {
        for (child of children) {
            place.appendChild(child)
        }
    }
    else {
        place.appendChild(children);
    }
}

function removeChildren(whatChilds, placeId) {
    let place = document.getElementById(placeId);
    // let child = document.getElementById(placeId).children;
    if (whatChilds === "all") {
        while (place.firstChild) {
            placeId.removeChild(place.lastChild);
        }
    }
    else if (whatChilds === "last") {
        place.removeChild(place.lastChild);
    }
    else if (whatChilds === "first") {
        place.removeChild(place.firstChild);
    }
    // else{
    //     place.removeChild(place.child[whatChilds]);
    // }
}

start();