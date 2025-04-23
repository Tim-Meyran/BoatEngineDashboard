import {coordinates, lastGpsPing, speed, time, tripDistance, gpsData} from "$lib/stores/Data.js";
import {get, writable} from "svelte/store";

export const allowGps = writable(false);
export const calcGps = writable(true);
let refreshTimer = null;

export function initGps() {
    if ("geolocation" in navigator && get(allowGps)) {
        navigator.geolocation.watchPosition(updateGps, e => console.log(e), {timeout: 10_000, enableHighAccuracy: true})
        clearInterval(refreshTimer)
        refreshTimer = setInterval(refreshGps, 200);
    } else {
        console.log("Gps is not available")
    }
}

function refreshGps(){
    navigator.geolocation.getCurrentPosition(updateGps, e => console.log(e), {timeout: 5_000, enableHighAccuracy: true})
}

function updateGps(pos) {
    //console.log(pos)
    updatePosition(pos)
    gpsData.set({time: new Date().valueOf(), pos})
}

function updatePosition(pos) {
    const coords = pos.coords
    if (coords.latitude && coords.longitude) {
        let lastCoords = get(coordinates)
        if (lastCoords && lastCoords.lon && lastCoords.lat) {
            let distKm = calcCrow(lastCoords.lat, lastCoords.lon, coords.latitude, coords.longitude)
            tripDistance.update(value => value + distKm)

            if(get(calcGps)){
                let timeDelta = pos.timestamp - lastCoords.timestamp
                if(timeDelta > 0.0) {
                    speed.set(distKm / (timeDelta / (1_000*60*60)))
                }
                console.log(distKm, timeDelta, pos.timestamp, lastCoords.timestamp, lastCoords)
            }
        }
        coordinates.set({timestamp: pos.timestamp, lat: coords.latitude, lon: coords.longitude})
        lastGpsPing.set(new Date().valueOf())
        console.log(get(coordinates))
    }

    if (coords.speed){
        console.log("Setting speed", coords.speed)
        speed.set(coords.speed)
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
