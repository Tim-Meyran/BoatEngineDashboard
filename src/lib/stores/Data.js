import {get, writable} from 'svelte/store';
import {requestConnect} from "$lib/stores/BluetoothConnection.js";
import {onMount} from "svelte";
import {initGps} from "$lib/stores/Gps.js";

export const bytes = writable(undefined);
export const speed = writable(0);
export const maxSpeed = writable(0);
export const rpm = writable(0);
export const maxRpm = writable(0);
export const tmp1 = writable(0);
export const tmp2 = writable(0);
export const tmp3 = writable(0);
export const tmp4 = writable(0);
export const voltage = writable(0);
export const lambda = writable(1);
export const coordinates = writable(undefined);
export const tripDistance = writable(0);
export const time = writable("");
export const lastGpsPing = writable(new Date().valueOf());
export const timeSinceLastGps = writable(new Date().valueOf());
export const gpsData = writable({});

time.subscribe(e => {
    timeSinceLastGps.set(Math.round(new Date().valueOf() - get(lastGpsPing)) / 1000)
})

speed.subscribe(s => {
    maxSpeed.update(old => Math.max(old, s))
})

export const demoMode = writable(false);

export const mapSwitch = writable(false);
export const lambdaHeater = writable(false);

bytes.subscribe(e => {
    //console.log('Update Bytes', e)
    if (e && e.byteLength === 10) {
        rpm.set(e.getUint16(0))
        maxRpm.set(e.getUint16(2))
        tmp1.set(e.getUint8(4))
        tmp2.set(e.getUint8(5))
        tmp3.set(e.getUint8(6))
        tmp4.set(e.getUint8(7))
        voltage.set(e.getUint8(8) / 10.0)
        lambda.set(e.getUint8(9) / 100.0)
    }
})

export function resetTrip() {
    tripDistance.set(0)
}

export function resetData() {
    speed.set(0)
    rpm.set(0)
    maxRpm.set(0)
    tmp1.set(0)
    tmp2.set(0)
    tmp3.set(0)
    tmp4.set(0)
    voltage.set(0)
    lambda.set(0)

    maxSpeed.set(0)
    coordinates.set({})
    tripDistance.set(0)
    lastGpsPing.set(0)
    timeSinceLastGps.set(0)
}

demoMode.subscribe(demo => {
    if (!demo) {
       resetData()
    }
})

function updateTime() {
    const currentDate = new Date();
    const datetime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    time.set(datetime)

    if (get(demoMode)) {
        speed.update(old => Math.min(Math.max(0, old + -5.0 + Math.random() * 10.0), 150.0))
        rpm.update(old => Math.min(Math.max(0, old + -50.0 + Math.random() * 100.0), 8500.0))
        tmp1.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
        tmp2.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
        tmp3.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
        tmp4.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
        voltage.update(old => Math.min(Math.max(10.4, old + -0.1 + Math.random() * 0.2), 14.8))
        lambda.update(old => Math.min(Math.max(0.7, old + -0.1 + Math.random() * 0.1), 1.2))
        coordinates.update(({lat, lon}) => ({
            timestamp: new Date().getMilliseconds(),
            lat: Math.min(Math.max(-20, lat + -0.001 + Math.random() * 0.002), 20),
            lon: Math.min(Math.max(-20, lon + -0.001 + Math.random() * 0.002), 20)
        }))
    }
    setTimeout(updateTime, 1000)
}

updateTime()

