<script>
    import Chart from 'chart.js/auto';

    import { onMount } from 'svelte';

    let chartValues = [20, 10, 5, 2, 20, 30, 45];
    let chartLabels = ['1', '2', '3', '4', '5', '6', '7'];
    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        ctx = chartCanvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartValues
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                responsive: true,
            }
        });

    });

</script>

<div class="chart-container" style="position: relative; height:100%; width:100%">
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>

