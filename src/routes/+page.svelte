<script>
    import {rpm, speed, tmp1, tmp2, voltage, time, lambda1, lambda2, lambda3} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
    import Chart from "$lib/Chart.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container">

    <Field name="Time" value={$time}/>
    <Field name="Speed" value={$speed} digitsSignificant={3}/>
    <Field name="RPM" value={$rpm} digitsSignificant={4}/>
    <Field name="Temp 1" value={$tmp1} digitsFraction="0"/>
    <Field name="Temp 2" value={$tmp2} digitsFraction="0"/>
    <Field name="Voltage" value={$voltage} digitsFraction="1"/>
    <Field name="Lambda 1" value={$lambda1} digitsFraction="2"/>
    <Field name="Lambda 2" value={$lambda2} digitsFraction="2"/>
    <Field name="Lambda 3" value={$lambda3} digitsFraction="2"/>

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
        gap: 1em;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
    }
</style>
