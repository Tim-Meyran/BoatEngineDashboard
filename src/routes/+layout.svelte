<script>
    import './styles.css';
    import {connected, connecting, requestConnect, disconnect} from "$lib/stores/BluetoothConnection.js";
    import {initGps} from "$lib/stores/Gps.js";
    import PwaInstall from "$lib/PwaInstall.svelte";
    import {demoMode, time} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
    import {onMount} from "svelte";

    $: connectionString = $connected ? "Connected" : "Not connected"
    $: connectionBtnString = $connected ? "Connected" : "Not connected"

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
</script>

<div class="app">

    <header class="container">
        <nav>
            <ul>
                <!--<li><strong><kbd>DASHBOARD</kbd></strong></li>-->
                <li>{$time}</li>
            </ul>

            <ul>
                <!--{#if !$connected}
                    <li>
                        <label>
                            Demo
                            <input name="terms" type="checkbox" role="switch" bind:checked={$demoMode}/>
                        </label>
                    </li>
                {/if}-->

                <li>
                    <button class="outline contrast" on:click={initGps}>GPS</button>
                </li>
                <li>
                    {#if $connected}
                        <ins>Connected</ins>
                    {:else if $connecting}
                        <i aria-busy="true">Connecting</i>
                    {:else}
                        <del>Not Connected</del>
                    {/if}
                </li>

                <li>
                    <PwaInstall/>
                </li>

                <li>
                    {#if $connected}
                        <button class="outline contrast" on:click={disconnect}>Disconnect</button>
                    {:else}
                        <button on:click={requestConnect}>Connect</button>
                    {/if}
                </li>

                <li>
                    <button on:click={toggleFullScreen} class="outline contrast">&#x26F6;</button>
                </li>
            </ul>
        </nav>
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
