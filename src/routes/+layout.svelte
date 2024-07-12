<script>
    import './styles.css';
    import {connected, connecting, requestConnect, disconnect} from "$lib/stores/BluetoothConnection.js";
    import {initGps} from "$lib/stores/Gps.js";
    import PwaInstall from "$lib/PwaInstall.svelte";
    import {demoMode, time} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
    import {onMount} from "svelte";
    import Modal from "$lib/Modal.svelte";
    import RequestGps from "$lib/RequestGps.svelte";

    $: connectionString = $connected ? "Connected" : "Not connected"
    $: connectionBtnString = $connected ? "Connected" : "Not connected"

    let showOptions = false

</script>

<div class="app">

    <header class="container">
        <nav>
            <ul>
                <!--<li><strong><kbd>DASHBOARD</kbd></strong></li>-->
                <li>{$time}</li>
            </ul>

            <ul>
                <li>
                    {#if $connected}
                        <button class="pico-color-green-500" on:click={disconnect}>Disconnect</button>
                    {:else if $connecting}
                        <button aria-busy="true" class="outline pico-color-red-500" on:click={disconnect}>Cancel
                        </button>
                    {:else}
                        <button class="" on:click={requestConnect}>Connect</button>
                    {/if}
                </li>


                <li><a href="#" class="secondary">
                    <button class="outline contrast" on:click={e => showOptions = true}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round"
                             class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 6l16 0"/>
                            <path d="M4 12l16 0"/>
                            <path d="M4 18l16 0"/>
                        </svg>
                    </button>
                </a></li>

            </ul>
        </nav>

        <RequestGps/>
        <Modal open={showOptions}></Modal>
        <PwaInstall/>
    </header>
    <main class="container">
        <slot/>
    </main>
</div>

<style>

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
