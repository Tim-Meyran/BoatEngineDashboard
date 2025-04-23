import {bytes, demoMode, resetData,gpsData} from "$lib/stores/Data.js";
import {dev} from "$app/environment";
import {get, writable} from "svelte/store";
import {initGps} from "$lib/stores/Gps.js";

export const connected = writable(false);
export const connecting = writable(false);
export const connectState = writable("Not Connected");
export var bluetoothDevice;

//let serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
let serviceUuid = "0x181a"
serviceUuid = parseInt(serviceUuid);
let characteristicUuid = "temperature"

let ble_service = null

export async function requestConnect() {
    try {
        demoMode.set(false)
        connectState.set("Connecting")
        connected.set(false)
        connecting.set(true)

        console.log('Requesting any Bluetooth Device...');
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            filters: [{services: [serviceUuid]}], acceptAllDevices: false, optionalServices: [serviceUuid]
        });

        bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);

        time('Connecting to Bluetooth Device... ');
        const device = await bluetoothDevice.gatt.connect();
        console.log('Connected to ', device)
        connectState.set("Connected")

        const services = await device.getPrimaryServices()
        console.log(services)
        if (!services || services.length === 0) {
            console.error("Found no services")
            return
        }

        ble_service = services[0]//await device.getPrimaryService(serviceUuid);
        const characteristic = await ble_service.getCharacteristic(characteristicUuid);
        await characteristic.startNotifications()
        characteristic.addEventListener('characteristicvaluechanged', e => {
            const b = characteristic.value
            console.log("Received ", b)
            bytes.set(b)
        });
        connected.set(true)
        connecting.set(false)
    } catch (error) {
        console.log('Argh! ' + error);
        bluetoothDevice = null;
        connected.set(false)
        connecting.set(false)
        alert(error)
    }
    return bluetoothDevice
}

export async function send(value){
    const characteristic = await service.getCharacteristic('heart_rate_control_point')
    await characteristic.writeValue(value)
      /*  .then(characteristic => {
            // Writing 1 is the signal to reset energy expended.
            const resetEnergyExpended = Uint8Array.of(1);
            return characteristic.writeValue(resetEnergyExpended);
        })
        .then(_ => {
            console.log('Energy expended has been reset.');
        })
        .catch(error => { console.error(error); });*/
}

export function disconnect() {
    //bytes.set(new ArrayBuffer(10))
    ble_service = null
    connected.set(false)
    connecting.set(false)
    resetData()
    if (bluetoothDevice === undefined) {
        return;
    }
    console.log('Disconnecting from Bluetooth Device...');

    if (bluetoothDevice && bluetoothDevice.gatt && bluetoothDevice.gatt.connected) {
        bluetoothDevice.gatt.disconnect();
    } else {
        console.log('> Bluetooth Device is already disconnected');
    }
    bluetoothDevice = null
    resetData()
}


function onDisconnected() {
    console.log('Bluetooth Device disconnected');
    ble_service = null
    if (get(connected)) {
        console.log("Reconnect")
        requestConnect();
    }
    /*    connected.set(false)
        connecting.set(false)
    */
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
