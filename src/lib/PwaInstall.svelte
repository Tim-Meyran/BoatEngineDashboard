<script>
    import {onMount} from 'svelte'

    let deferredInstallEvent

    onMount(() => {
        window.addEventListener("beforeinstallprompt", e => {
            //e.prompt()
            //e.preventDefault()
            deferredInstallEvent = e
        })
    })

    async function handleInstall() {
        deferredInstallEvent.prompt()
        let choice = await deferredInstallEvent.userChoice
        if (choice.outcome === "accepted") {
            // User accepted to install the application
        } else {
            // User dismissed the prompt
        }
        deferredInstallEvent = undefined
    }
</script>

{#if deferredInstallEvent}
    <button class="install-button" on:click={handleInstall}>Install App</button>
{/if}

<slot/>

<style>
    .install-button {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
</style>