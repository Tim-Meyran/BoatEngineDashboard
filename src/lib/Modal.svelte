<script>
    import {demoMode, timeSinceLastGps, resetTrip, resetData, gpsData} from "$lib/stores/Data.js";
    import {initGps} from "$lib/stores/Gps.js";

    export let open = false

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

</script>

<dialog open="{open}" style="flex-direction: column">
        <article>
        <header>
            <button aria-label="Close" rel="prev" on:click={e => open = false}></button>
            <p>
                <strong>🚤 Options</strong>
            </p>
        </header>

        <form>
            <fieldset>
                <input class="" type="button" value="Fullscreen" on:click={toggleFullScreen}>
                <input class="secondary" type="button" value="Reset Trip" on:click={resetTrip}>
                <input class="contrast pico-color-red-500" type="button" value="Clear Data" on:click={resetData}>
                {#if $timeSinceLastGps > 5}
                    <input class="contrast" type="button" value="GPS" on:click={initGps}>
                {/if}
                <label>
                    <input class="contrast" name="demoMode" type="checkbox" role="switch" bind:checked={$demoMode}/>
                    Demo Mode
                </label>

            </fieldset>
        </form>


    </article>

    <article>
        <h1>GPS Data</h1>
        <p>{JSON.stringify(gpsData)}</p>

    </article>
</dialog>

<style>

</style>