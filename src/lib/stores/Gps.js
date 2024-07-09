import {coordinates, speed} from "$lib/stores/Data.js";

export function initGps() {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(updateGps, e => console.log(e), {})
        } else {
            console.log("Gps is not available")
        }
}

function updateGps(data) {
    console.log(data)
    //setTimeout(updateGps, 100)
}

function updatePosition(coords) {
    if (coords.speed)
        speed.set(coords.speed)

    if (coords.latitude && coords.longitude)
        coordinates.set({lat: coords.latitude, lon: coords.longitude})
}
