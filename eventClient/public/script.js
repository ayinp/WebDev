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
            for (newEvent of events) {
                let li = listItem(anchor(newEvent.name, "/?event=" + newEvent.id));
                addChildren(li, "events");
                if (getQueryParam("event") === newEvent.id) {
                    let info = [listItem(newEvent.name), listItem(newEvent.date), listItem(newEvent.time), listItem(newEvent.duration)];
                    addChildren(info, "eventDetails")
                }
                if(getQueryParam("event") === newEvent.id && )
            }
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function signUp(){
    fetch('/signups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        eventId: getQueryParam("event")
        })
    })
    .then(res => res.json())
    .then(data => {
        //enter logic stuffs for successful fetching
        console.log(data);
    })
    .catch(error => {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    })
}

function getStudentId(){
    
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
    if(!child){
        li.innerText = "null";
    }
    else if (typeof child === "string") {
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

function getQueryParam(name){
    let params = new URLSearchParams(document.location.search.substring(1));
    return params.get(name);
}

start();