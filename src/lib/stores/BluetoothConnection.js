import {bytes} from "$lib/stores/Data.js";
import {dev} from "$app/environment";
import {get, writable} from "svelte/store";

export const connected = writable(false);
export var bluetoothDevice;

//let serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
let serviceUuid = "0x181a"
serviceUuid = parseInt(serviceUuid);
let characteristicUuid = "temperature"

export async function requestConnect() {
    try {
        console.log('Requesting any Bluetooth Device...');
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{services: [serviceUuid]}], acceptAllDevices: false, optionalServices: [serviceUuid]
        });

        bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);

        time('Connecting to Bluetooth Device... ');
        const device = await bluetoothDevice.gatt.connect();
        console.log('Connected to ', device)

        const services = await device.getPrimaryServices()
        console.log(services)
        if (!services || services.length === 0) {
            console.error("Found no services")
            return
        }

        const service = services[0]//await device.getPrimaryService(serviceUuid);
        const characteristic = await service.getCharacteristic(characteristicUuid);
        await characteristic.startNotifications()
        characteristic.addEventListener('characteristicvaluechanged', e => {
            const b = characteristic.value
            console.log("Received ", b)
            bytes.set(b)
        });
        connected.set(true)
    } catch (error) {
        console.log('Argh! ' + error);
        bluetoothDevice = null;
    }
    return bluetoothDevice
}

export function disconnect() {
    connected.set(false)
    if (bluetoothDevice === undefined) {
        return;
    }
    console.log('Disconnecting from Bluetooth Device...');

    if (bluetoothDevice.gatt.connected) {
        bluetoothDevice.gatt.disconnect();
    } else {
        console.log('> Bluetooth Device is already disconnected');
    }
    bluetoothDevice = null
}


function onDisconnected() {
    console.log('> Bluetooth Device disconnected');

    if (get(connected)) {
        console.log("Reconnect")
        requestConnect();
    }
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
