import {bytes} from "$lib/stores/Data.js";
import {dev} from "$app/environment";
import {writable} from "svelte/store";

export const connected = writable(false);
export var bluetoothDevice;

let serviceUuid = "0x181a"
serviceUuid = parseInt(serviceUuid);
let characteristicUuid = "temperature"

export async function requestConnect() {
    bluetoothDevice = null;
    try {
        console.log('Requesting any Bluetooth Device...');
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            acceptAllDevices: true
        });
        bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
        connect();
    } catch (error) {
        console.log('Argh! ' + error);
        bluetoothDevice = null;
    }
    return bluetoothDevice
}

async function connect() {
    //await exponentialBackoff(3 /* max retries */, 10 /* seconds delay */, async function toTry() {
    time('Connecting to Bluetooth Device... ');
    const device = await bluetoothDevice.gatt.connect();
    console.log('Connected to ', device)
    const service = await device.getPrimaryService(serviceUuid);
    const characteristic = await service.getCharacteristic(characteristicUuid);
    await characteristic.startNotifications()
    characteristic.addEventListener('characteristicvaluechanged', e => {
        const b = characteristic.value
        console.log("Received ", b)
        bytes.set(b)
    });
    connected.set(true)
    /*}, function success() {
        console.log('> Bluetooth Device connected.');
    }, function fail() {
        time('Failed to reconnect.');
        connected.set(false)
    });*/
}

function onDisconnected() {
    console.log('> Bluetooth Device disconnected');
    connected.set(false)
    connect();
}

/* Utils */

// This function keeps calling "toTry" until promise resolves or has
// retried "max" number of times. First retry has a delay of "delay" seconds.
// "success" is called upon success.
async function exponentialBackoff(max, delay, toTry, success, fail) {
    try {
        const result = await toTry();
        success(result);
    } catch (error) {
        //alert(error)
        if (max === 0) {
            return fail();
        }
        time('Retrying in ' + delay + 's... (' + max + ' tries left)');
        setTimeout(function () {
            exponentialBackoff(--max, delay * 2, toTry, success, fail);
        }, delay * 1000);
    }
}

function time(text) {
    console.log('[' + new Date().toJSON().substr(11, 8) + '] ' + text);
}
