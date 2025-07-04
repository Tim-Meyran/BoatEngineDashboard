<script>

    export let name = "Name"
    export let value = ""
    export let unit = ""
    export let digitsFraction = 0
    export let digitsSignificant = 0
</script>

<span>
    <kbd>
    <strong>{name}</strong>
        {value.toLocaleString(undefined, {
            minimumFractionDigits: digitsFraction,
            maximumFractionDigits: digitsFraction
        }).padStart(digitsSignificant, '0')}<i>{unit}</i>
    </kbd>
    </span>
<style>

    kbd{
        font-size:2.5rem;
        background-color: white;
    }

</style>