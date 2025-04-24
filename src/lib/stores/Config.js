import {writable} from "svelte/store";
import { browser } from "$app/environment"

function readLocalStorage(key, def){
    if(!browser)return null
    let v = localStorage.getItem(key)
    if(v == null) return def
    console.log("readLocalStorage",key,v)
    return v === 'true'
}

function writeLocalStorage(key, value){
    if(!browser)return
    localStorage.setItem(key,value)
}

export const allowGps = writable(readLocalStorage("allowGps",false));
export const calcGps =  writable(readLocalStorage("calcGps",true));
export const useGpsPolling =  writable(readLocalStorage("useGpsPolling",true));

allowGps.subscribe(v => writeLocalStorage("allowGps",v))
calcGps.subscribe(v => writeLocalStorage("calcGps",v))
useGpsPolling.subscribe(v => writeLocalStorage("useGpsPolling",v))