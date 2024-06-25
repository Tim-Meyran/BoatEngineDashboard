import {get, writable} from 'svelte/store';
import {requestConnect} from "$lib/stores/BluetoothConnection.js";

export const bytes = writable(undefined);
export const speed = writable(0);
export const rpm = writable(0);
export const tmp1 = writable(20);
export const tmp2 = writable(21);
export const voltage = writable(11.78);
export const coordinates = writable({lat: 0.0, lon: 0.0});
export const time = writable("");

bytes.subscribe(e => {
    if (e) {
        tmp1.set(e.getInt16(0))
    }
})

function updateTime() {
    const currentDate = new Date();
    const datetime = currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds();
    time.set(datetime)

    speed.update(old => Math.min(Math.max(0, old + -5.0 + Math.random() * 10.0), 150.0))
    rpm.update(old => Math.min(Math.max(0, old + -50.0 + Math.random() * 100.0), 8500.0))
    tmp1.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
    tmp2.update(old => Math.min(Math.max(0, old + -1.0 + Math.random() * 2.0), 150.0))
    voltage.update(old => Math.min(Math.max(10.4, old + -0.1 + Math.random() * 0.2), 14.8))
    coordinates.update(({lat, lon}) =>
        ({
            lat: Math.min(Math.max(-20, lat + -0.001 + Math.random() * 0.002), 20),
            lon: Math.min(Math.max(-20, lon + -0.001 + Math.random() * 0.002), 20)
        }))

    setTimeout(updateTime, 1000)
}

updateTime()

