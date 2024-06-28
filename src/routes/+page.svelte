<script>
    import {rpm, speed, tmp1, tmp2, voltage, time} from "$lib/stores/Data.js";
    import Field from "$lib/Field.svelte";
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
    <Field name="Voltage" value={$voltage} digitsFraction="1" />

</section>

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
