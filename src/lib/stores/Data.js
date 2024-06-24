import {writable} from 'svelte/store';
import {requestConnect} from "$lib/stores/BluetoothConnection.js";

export const bytes = writable(undefined);
export const temp = writable(0);

bytes.subscribe(e => {
    if(e) {
        temp.set(e.getInt16(0))
    }
})

