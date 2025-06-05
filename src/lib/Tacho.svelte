<script>
    export let value = 87;
    export let max = 100;
    export let label = "max 100";
    export let startAngle = -200;
    export let endAngle = 20;
    export let ticks = 10;

    export let startNeedle = 40;
    export let endNeedle = 70;
    export let digitsSignificant = 0

    $: angle = (value / max) * (endAngle - startAngle) + startAngle;

    // Ticks vorberechnen
    $: tickLines = Array.from({length: ticks}, (_, i) => {
        const tickAngle = startAngle + i * ((endAngle - startAngle) / (ticks - 1));
        const rad = Math.PI * tickAngle / 180;
        return {
            x1: 100 + 80 * Math.cos(rad),
            y1: 100 + 80 * Math.sin(rad),
            x2: 100 + 90 * Math.cos(rad),
            y2: 100 + 90 * Math.sin(rad)
        };
    });
</script>

<svg viewBox="0 0 200 200" width="100%" height="100%">
    <!-- Kreis -->
    <circle cx="100" cy="100" r="90" stroke="#fff" stroke-width="10" fill="none"/>

    <!-- Skalenstriche -->
    {#each tickLines as {x1, y1, x2, y2}}
        <line {x1} {y1} {x2} {y2} stroke="#fff" stroke-width="5"        />
    {/each}

    <!-- Nadel -->
    <line
            x1={100 + startNeedle * Math.cos(Math.PI * angle / 180)}
            y1={100 + startNeedle * Math.sin(Math.PI * angle / 180)}
            x2={100 + endNeedle * Math.cos(Math.PI * angle / 180)}
            y2={100 + endNeedle * Math.sin(Math.PI * angle / 180)}
            stroke="red"
            stroke-width="10"
            stroke-linecap="round"
    />

    <!-- Wert-Anzeige -->
    <text x="100" y="110" text-anchor="middle" font-size="28" fill="white" font-family="monospace">
        {String(value).padStart(digitsSignificant, '0')}
    </text>

    <!-- Beschriftung unten -->
    <text x="100" y="140" text-anchor="middle" font-size="18" fill="white" font-family="monospace">
        {label}
    </text>
</svg>
