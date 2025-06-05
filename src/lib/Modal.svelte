<script>
    import {
        demoMode,
        timeSinceLastGps,
        resetTrip,
        resetData,
        gpsData,
        mapSwitch,
        lambdaHeater
    } from "$lib/stores/Data.js";
    import {calcGps, allowGps, useGpsPolling} from "$lib/stores/Config.js";
    import {initGps} from "$lib/stores/Gps.js";
    import {onMount} from "svelte";

    import {base} from "$app/paths"

    export let open = false

    let versionString = ""

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    onMount(() =>
        getVersion()
    )

    async function getVersion() {
        const versionFile = await fetch('esp32/version');
        versionString = await versionFile.text()
        console.log("Got Version: ", versionString)
    }

</script>

<dialog open="{open}" style="flex-direction: column">
    <article>
        <header>
            <button aria-label="Close" rel="prev" on:click={e => open = false}></button>
            <p>
                <strong>Dashboard - {versionString} 🚤 </strong>
            </p>
        </header>

        <form>
            <fieldset>
                <input class="" type="button" value="Fullscreen" on:click={toggleFullScreen}>
                <input class="secondary" type="button" value="Reset Trip" on:click={resetTrip}>
                <input class="contrast pico-color-red-500" type="button" value="Clear Data" on:click={resetData}>
                <!--{#if $timeSinceLastGps > 5}
                    <input class="contrast" type="button" value="GPS" on:click={initGps}>
                {/if}-->
                <a href="{base}/tacho_layout" class="contrast">Tacho Layout</a>
                <a href="{base}/" class="contrast">Old Layout</a>

                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch" bind:checked={$mapSwitch}/>
                    Map Switch
                </label>
                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch" bind:checked={$lambdaHeater}/>
                    Lambda Heater
                </label>
                <br>
                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch" bind:checked={$demoMode}/>
                    Demo Mode
                </label>
                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch" bind:checked={$calcGps}/>
                    Calculate GPS Speed
                </label>
                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch"
                           bind:checked={$useGpsPolling}/>
                    GPS Polling
                </label>

            </fieldset>
        </form>


    </article>

    <article>
        <h1>GPS Data</h1>
        <p>{JSON.stringify($gpsData)}</p>
    </article>
</dialog>

<style>

</style>