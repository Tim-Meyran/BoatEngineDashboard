<script>
    import {rpm, speed, tmp1, tmp2, voltage, time} from "$lib/stores/Data.js";
    import {requestConnect} from "$lib/stores/BluetoothConnection.js";
    import Field from "$lib/Field.svelte";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="Dashboard" content="Dashboard"/>
</svelte:head>

<section class="grid-container">

    <Field name="Time" value={$time}/>
    <Field name="Speed" value={$speed} digitsSignificant={4} digitsFraction={1}/>
    <Field name="RPM" value={$rpm} digitsSignificant={4}/>
    <Field name="Temperature 1" value={$tmp1} digitsFraction="0"/>
    <Field name="Temperature 2" value={$tmp2} digitsFraction="0"/>
    <Field name="Voltage" value={$voltage}/>

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
