<script>
    import {tmp1} from "$lib/stores/Data.js";
    import Chart from "$lib/Chart.svelte";

    export let name = "Name"
    export let value = ""
    export let unit = ""
    export let digitsFraction = 0
    export let digitsSignificant = 0

    export let min = undefined
    export let max = undefined
</script>


<article>
    <header>
        {name}
        <div style="float:right">
            <kbd>
                {value.toLocaleString(undefined, {
                    minimumFractionDigits: digitsFraction,
                    maximumFractionDigits: digitsFraction
                }).padStart(digitsSignificant, '0')} <i>{unit}</i></kbd>
        </div>

    </header>

    <div class="chart">
        <Chart value={value} maxValues="30" min={min} max={max}/>
    </div>
</article>

<style>
    article {
        min-width: 10rem;

    }

    .card {
        position: relative;
        display: block;
    }

    .chart {
        /*position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;*/
        padding: 0;
        width: 100%;
        height: 4rem;

    }
</style>