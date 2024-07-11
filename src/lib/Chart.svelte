<script>
    import Chart from 'chart.js/auto';

    import {onMount} from 'svelte';

    let ctx;
    let chartCanvas;
    var chart = undefined

    export let value

    export let min = undefined
    export let max = undefined
    export let maxValues = 20
    let labelCounter = 0
    let lastY = 0

    let yScale = {
        display: true
    }

    export function addValue(v) {
        if (chart) {
            labelCounter++
            chart.data.labels.push(labelCounter);
            chart.data.datasets[0].data.push(v)

            if (chart.data.datasets[0].data.length > maxValues) {
                chart.data.labels.shift()
                chart.data.datasets[0].data.shift()
            }
            chart.update();
        }
    }

    $: if (value && chart) {
        addValue(value)
    }

    const animation = {
        x: {
            duration: 100
        },
        y: {
            duration: 0,
        }
    };

    onMount(async (promise) => {
        if(min !==undefined) yScale.min = min
        if(max !==undefined) yScale.max = max

        //console.log(min,max, yScale)

        ctx = chartCanvas.getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Data',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [],
                    /*stepped: true*/
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false
                    }
                    /*decimation: {
                        enabled: true,
                    }*/
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
                        min: labelCounter
                    },
                    y: yScale
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                animation
            }
        });

        for (let i = 0; i < maxValues; i++) {
            addValue(value)
        }
    });

</script>

<div class="chart-container" style="position: relative; height:100%; width:100%">
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>

