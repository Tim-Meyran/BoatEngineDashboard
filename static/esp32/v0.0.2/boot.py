# boot.py -- run on boot-up

def connectWifi():
    from network import WLAN, STA_IF
    from wifi_creds import SSID, SSID_PASSWORD
    import time

    sta_if = WLAN(STA_IF)
    sta_if.active(True) # activate the interface
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID,SSID_PASSWORD)
        
        for x in range(6):
            time.sleep(1)
            print("Checking Wifi Connection")
            if not sta_if.isconnected():
                pass
            
    if not sta_if.isconnected():
        print("Could not connect to Wifi - disabling Wifi Interface")
        sta_if.active(False) #deactivate the interface
        return
    
    print('Connected! Network config:', sta_if.ifconfig())

    from ota import otaUpdate
    otaUpdate()

    #import mip
    #mip.install("aioble")
    print("Starting webREPL")
    import webrepl
    webrepl.start()

connectWifi()
