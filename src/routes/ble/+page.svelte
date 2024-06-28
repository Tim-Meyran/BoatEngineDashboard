<script>
    import {bytes} from "$lib/stores/Data.js";

    async function onButtonClick() {
        let serviceUuid = "0x181a"

        /*document.querySelector('#service').value;
        */
        //if (serviceUuid.startsWith('0x')) {
        serviceUuid = parseInt(serviceUuid);
        //}

        let characteristicUuid = "temperature"
        /*document.querySelector('#characteristic').value;
        if (characteristicUuid.startsWith('0x')) {
            characteristicUuid = parseInt(characteristicUuid);
        }*/

        try {
            console.log('Requesting any Bluetooth Device...');
            const device = await navigator.bluetooth.requestDevice({
                /*filters: [
                    { services: [serviceUuid] }
                ],*/ // <- Prefer filters to save energy & show relevant devices.
                acceptAllDevices: true, optionalServices: [serviceUuid, "00001825-0000-1000-8000-00805f9b34fb"]
            });

            console.log('Connecting to GATT Server...');
            const server = await device.gatt.connect();

            console.log('Getting Service...');
            const service = await server.getPrimaryService(serviceUuid);
            console.log('service', service);

            console.log('Getting Characteristic...');
            const characteristic = await service.getCharacteristic(characteristicUuid);

            console.log('startNotifications');
            await characteristic.startNotifications()
            characteristic.addEventListener('characteristicvaluechanged', e => {
                console.log(e)
                console.log(characteristic.value)
                if(characteristic.value){
                    bytes.set(characteristic.value)
                }
            });

            console.log('Getting Descriptors...');
            const descriptors = await characteristic.getDescriptors();

            for (const descriptor of descriptors) {
                console.log(descriptor.uuid)
                console.log(descriptor)

                let value = await descriptor.readValue()
                console.log('> Client Value:');
                console.log(value.byteLength);
                console.log(value.buffer);
                console.log(value.getUint16(0));
                //let notificationsBit = value.getUint8(0) & 0b01;
                //console.log('  > Notifications: ' + (notificationsBit ? 'ON' : 'OFF'));
                //let indicationsBit = value.getUint8(0) & 0b10;
                //console.log('  > Indications: ' + (indicationsBit ? 'ON' : 'OFF'));
            }
        } catch
            (error) {
            console.log('Argh! ' + error);
        }
    }

    /* Utils */

    const valueToReportType = {
        1: 'Input Report',
        2: 'Output Report',
        3: 'Feature Report'
    };

    function getReportType(value) {
        let v = value.getUint8(1);
        return v + (v in valueToReportType ?
            ' (' + valueToReportType[v] + ')' : 'Unknown');
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
    <button on:click={onButtonClick}>Connect</button>

</section>

