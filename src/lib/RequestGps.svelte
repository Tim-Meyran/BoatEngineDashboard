<script>
    import {allowGps} from "$lib/stores/Config.js";
    import {initGps} from "$lib/stores/Gps.js";
    import {get} from "svelte/store";
    import {onMount} from "svelte";

    export let open = !get(allowGps)

    onMount(() => {
        initGps()
    })

    function enableGps() {
        open = false
        $allowGps = true
        initGps()
    }
</script>

<dialog open="{open}">
    <article>
        <header>
            <button aria-label="Close" rel="prev" on:click={e => open = false}></button>
            <p>
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="icon icon-tabler icons-tabler-outline icon-tabler-map-plus">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v8.5"/>
                        <path d="M9 4v13"/>
                        <path d="M15 7v8"/>
                        <path d="M16 19h6"/>
                        <path d="M19 16v6"/>
                    </svg>
                    Location</strong>
            </p>
        </header>

        <p>
            bla bla bla.. Datenschutz ... bla bla ....
            Gib GPS?
        </p>
        <button on:click={enableGps}>Enable GPS <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg></button>
        <button class="secondary" on:click={e => open = false}>No GPS <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-navigation-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.28 12.28c-.95 -2.064 -2.377 -5.157 -4.28 -9.28c-.7 1.515 -1.223 2.652 -1.573 3.41m-1.27 2.75c-.882 1.913 -2.59 5.618 -5.127 11.115c-.07 .2 -.017 .424 .135 .572c.15 .148 .374 .193 .57 .116l7.265 -2.463l7.265 2.463c.196 .077 .42 .032 .57 -.116a.548 .548 0 0 0 .134 -.572l-.26 -.563" /><path d="M3 3l18 18" /></svg></button>

    </article>
</dialog>

<style>

</style>