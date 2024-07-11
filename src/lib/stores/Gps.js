import {coordinates, lastGpsPing, speed, tripDistance} from "$lib/stores/Data.js";
import {get} from "svelte/store";

export function initGps() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(updateGps, e => console.log(e), {})
    } else {
        console.log("Gps is not available")
    }
}

function updateGps(pos) {
    console.log(pos)
    updatePosition(pos.coords)
}

function updatePosition(coords) {
    if (coords.speed)
        speed.set(coords.speed)

    if (coords.latitude && coords.longitude) {
        let lastCoords = get(coordinates)
        if (lastCoords) {
            let dist = calcCrow(lastCoords.lat, lastCoords.lon, coords.latitude, coords.longitude)
            tripDistance.update(value => value + dist)
        }
        coordinates.set({lat: coords.latitude, lon: coords.longitude})
        lastGpsPing.set(new Date().valueOf())
    }
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    let R = 6371; // km
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
