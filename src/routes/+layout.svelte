<script>
    import './styles.css';
    import {connected, requestConnect} from "$lib/stores/BluetoothConnection.js";

    $: connectionString = $connected ? "Connected" : "Not connected"
    $: connectionBtnString = $connected ? "Connected" : "Not connected"

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
</script>

<div class="app">

    <header class="container">
        <nav>
            <ul>
                <li><strong><kbd>DASHBOARD</kbd></strong></li>
            </ul>

            <ul>
                <li>
                    {#if $connected}
                        <ins>Connected</ins>
                    {:else }
                        <del>Not Connected</del>
                    {/if}
                </li>

                <li>
                    <button on:click={requestConnect}>Connect</button>
                </li>

                <li>
                    <button on:click={toggleFullScreen} class="outline contrast">&#x26F6;</button>
                </li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <slot/>
    </main>
</div>

<style>

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
