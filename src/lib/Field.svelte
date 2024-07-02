<script>

    export let name = "Name"
    export let value = ""
    export let digitsFraction = 0
    export let digitsSignificant = 10


</script>


<article>
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