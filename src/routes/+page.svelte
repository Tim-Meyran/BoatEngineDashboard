<script>
    import {rpm, speed, tmp1, tmp2, voltage, time, lambda1, lambda2, lambda3} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
    import Chart from "$lib/Chart.svelte";
    import GraphField from "$lib/GraphField.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container">
    <GraphField name="Speed" value={$speed} unit="km/h" digitsSignificant={3}/>
    <GraphField name="RPM" value={$rpm} digitsSignificant={4}/>
    <GraphField name="Temp1" value={$tmp1} unit="°C" digitsFraction="0"/>
    <GraphField name="Temp2" value={$tmp2} unit="°C" digitsFraction="0"/>
    <GraphField name="Voltage" value={$voltage} unit="V" digitsFraction="1"/>
    <GraphField name="Lambda 1" value={$lambda1} digitsFraction="2"/>
    <GraphField name="Lambda 2" value={$lambda2} digitsFraction="2"/>
    <GraphField name="Lambda 3" value={$lambda3} digitsFraction="2"/>
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
