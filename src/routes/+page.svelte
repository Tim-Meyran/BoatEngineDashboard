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
        lastGpsPing
    } from "$lib/stores/Data.js";
    import GraphField from "$lib/GraphField.svelte";
    import Field from "$lib/Field.svelte";

    let lastGps = new Date().getMilliseconds()
    $: if ($time) {
        lastGps = new Date().getMilliseconds() - $lastGpsPing
    }

</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container-large">
    <Field name="Speed" value={$speed} unit="km/h" digitsSignificant={3} min={0}/>
    <Field name="RPM" value={$rpm} unit="u/min" digitsSignificant={4} min={0} max={8000}/>
</section>

<section class="grid-container">
    <GraphField name="Speed" value={$speed} unit="km/h" digitsSignificant={3} min={0}/>
    <GraphField name="RPM" value={$rpm} digitsSignificant={4} min={0} max={8000}/>
    <GraphField name="Trip" value={$tripDistance} unit="km" min={0}/>
    <GraphField name="Temp1" value={$tmp1} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp2" value={$tmp2} unit="°C" digitsFraction="0"/>
    <GraphField name="Voltage" value={$voltage} unit="V" digitsFraction="1" min={10} max={16}/>
    <GraphField name="Lambda 1" value={$lambda1} digitsFraction="2" min={0} max={1}/>
    <GraphField name="Lambda 2" value={$lambda2} digitsFraction="2" min={0} max={1}/>
    <GraphField name="Lambda 3" value={$lambda3} digitsFraction="2" min={0} max={1}/>
    <GraphField name="last Gps" value={lastGps}/>
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
        font-size: 2rem;
    }

    .grid-container {
        gap: 2.2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    }
</style>
