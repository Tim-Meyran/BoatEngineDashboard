<script>

    export let name = "Name"
    export let value = ""

    export let unit = ""
    export let digitsFraction = 0
    export let digitsSignificant = 10


</script>


<article>
    {name}
    <kbd style="float: right; width: 60%">{value.toLocaleString(undefined, {
        minimumFractionDigits: digitsFraction,
        maximumFractionDigits: digitsFraction
    }).padStart(digitsSignificant, '0')} <i>{unit}</i></kbd>
</article>

<style>
    article {
        min-width: 8rem;
    }

    kbd{
        text-align:right;
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