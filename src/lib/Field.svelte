<script>
    import {tmp1} from "$lib/stores/Data.js";

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
</style>