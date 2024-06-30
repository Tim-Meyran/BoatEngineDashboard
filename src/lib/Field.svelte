<script>
    import {tmp1} from "$lib/stores/Data.js";
    import Chart from "$lib/Chart.svelte";

    export let name = "Name"
    export let value = ""
    export let digitsFraction = 0
    export let digitsSignificant = 10

</script>


<article>
    <!--<div class="chart">
        <Chart/>
    </div>-->
    <header>{name}</header>
    {value.toLocaleString(undefined, {
        minimumFractionDigits: digitsFraction,
        maximumFractionDigits: digitsFraction
    })}
</article>

<style>
    article {
        min-width: 8rem;
    }

    .chart {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>