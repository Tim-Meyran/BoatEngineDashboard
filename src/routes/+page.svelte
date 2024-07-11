<script>
    import {
        rpm,
        speed,
        tripDistance,
        tmp1,
        tmp2,
        voltage,
        time,
        lambda1,
        lambda2,
        lambda3,
        lastGpsPing, timeSinceLastGps, maxRpm, maxSpeed
    } from "$lib/stores/Data.js";
    import GraphField from "$lib/GraphField.svelte";
    import Field from "$lib/Field.svelte";

</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container-large">
    <Field name="V" value={$speed} unit="km/h" digitsSignificant={3} min={0}/>
    <Field name="RPM" value={$rpm} unit="" digitsSignificant={4} min={0} max={8000}/>
</section>

<section class="grid-container">
    <GraphField name="V" value={$speed} unit="km/h" digitsSignificant={3} min={0}/>
    <GraphField name="Vmax" value={$maxSpeed} unit="km/h" digitsSignificant={3} min={0}/>
    <GraphField name="RPM" value={$rpm} digitsSignificant={4} min={0} max={8000}/>
    <GraphField name="RPM max" value={$maxRpm} digitsSignificant={4} min={0} max={8000}/>
    <GraphField name="Trip" value={$tripDistance} unit="km" min={0}/>
    <GraphField name="Temp1" value={$tmp1} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp2" value={$tmp2} unit="°C" digitsFraction="0"/>
    <GraphField name="Voltage" value={$voltage} unit="V" digitsFraction="1" min={10} max={16}/>
    <GraphField name="Lambda 1" value={$lambda1} digitsFraction="2" min={0} max={1}/>
    <GraphField name="Lambda 2" value={$lambda2} digitsFraction="2" min={0} max={1}/>
    <GraphField name="Lambda 3" value={$lambda3} digitsFraction="2" min={0} max={1}/>
    <GraphField name="last Gps" value={$timeSinceLastGps}/>
</section>

<!--<section>
    <Chart/>
</section>-->

<style>
    section {
        display: flex;
        flex-flow: row-reverse wrap;

    }

    .grid-container-large {
        gap: 2.2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        font-size: 2.0rem;
    }

    .grid-container {
        gap: 2.2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    }
</style>
