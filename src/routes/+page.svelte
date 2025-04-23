<script>
    import {rpm, speed, tripDistance, tmp1, tmp2,tmp3, tmp4, voltage, time, lambda} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
    import Chart from "$lib/Chart.svelte";
    import GraphField from "$lib/GraphField.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container">
    <GraphField name="Speed" value={$speed} unit="km/h" digitsSignificant={3} min={0}/>
    <GraphField name="Trip" value={$tripDistance} unit="km" min={0}/>
    <GraphField name="RPM" value={$rpm} digitsSignificant={4} min={0} max={8000}/>
    <GraphField name="Temp1" value={$tmp1} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp2" value={$tmp2} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp3" value={$tmp3} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp4" value={$tmp4} unit="°C" digitsFraction="0"/>
    <GraphField name="Voltage" value={$voltage} unit="V" digitsFraction="1" min={10} max={16}/>
    <GraphField name="Lambda" value={$lambda} digitsFraction="2" min={0.68} max={1.36}/>
</section>

<!--<section>
    <Chart/>
</section>-->

<style>
    section {
        display: flex;
        flex-flow: row-reverse wrap;

    }

    .grid-container {
        gap: 2.2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    }
</style>
