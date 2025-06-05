<script>
    import Tacho from "$lib/Tacho.svelte";
    import {
        rpm,
        speed,
        tripDistance,
        tmp1,
        tmp2,
        tmp3,
        tmp4,
        voltage,
        time,
        lambda,
        mapSwitch, lambdaHeater
    } from "$lib/stores/Data.js";
    import Label from "$lib/Label.svelte";
</script>

<header class="trip">
    <Label name="Trip" value={$lambda} digitsSignificant="5" digitsFraction="1" unit="km"></Label>
</header>

<main>
    <div class="center-vertical">
        <section class="dashboard">
            <!-- Links: Temperaturen -->
            <div class="left">
                <Label name="#1" value={$tmp1} digitsSignificant="3" unit=" °C"></Label>
                <Label name="#2" value={$tmp2} digitsSignificant="3" unit=" °C"></Label>
                <Label name="#3" value={$tmp3} digitsSignificant="3" unit=" °C"></Label>
                <Label name="#4" value={$tmp4} digitsSignificant="3" unit=" °C"></Label>
            </div>

            <!-- Mitte: Tachometer -->
            <div class="gauges">
                <Tacho value={$rpm} max={8000} label="RPM" digitsSignificant="4"/>
                <Tacho value={$speed} max={100} label="Speed" digitsSignificant="3"/>
            </div>

            <!-- Rechts: Spannungen, Lambda, Ausgänge -->
            <div class="right">
                <Label name="Voltage" value={$voltage} digitsSignificant="4" digitsFraction="1" unit="V"></Label>
                <Label name="Lambda" value={$lambda} digitsSignificant="3" unit=""></Label>

                <div class="switches">
                    <fieldset>
                        <label>
                            <input class="contrast" name="demoMode" type="checkbox" role="switch"
                                   bind:checked={$mapSwitch}/>
                            <!--{#if $mapSwitch}<kbd>Map</kbd>{:else}Map{/if}-->Map
                        </label>
                        <label>
                            <input class="contrast" name="demoMode" type="checkbox" role="switch"
                                   bind:checked={$lambdaHeater}/>
                            Heater
                        </label>
                    </fieldset>
                </div>
            </div>
        </section>
    </div>

</main>


<style>
    .dashboard {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        gap: 1rem;
        align-items: start;
        justify-items: center;
        margin-top: 2rem;
        height: 100%;
    }

    .left, .right {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1.5rem;
    }

    .gauges {
        display: flex;
        gap: 1rem;
        height: 100%;
    }

    .trip {
        text-align: center;
        font-size: 1.5rem;
    }

    .switches {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }

    .switches label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

</style>