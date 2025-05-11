import math
import sys

from machine import Pin, ADC, I2C, Timer, SoftI2C,SPI, SoftSPI


sys.path.append("")

import max31855

from micropython import const

import asyncio
import aioble
import bluetooth

import struct


#i2c = I2C(freq=400000, scl=22, sda=21)
#i2c = SoftI2C(sda=Pin(21), scl=Pin(22))

pinVoltage = ADC(Pin(32))
pinVoltage.atten(ADC.ATTN_11DB)

pinTmp1 = ADC(Pin(34))
pinTmp1.atten(ADC.ATTN_11DB)

pinTmp2 = ADC(Pin(35))
pinTmp2.atten(ADC.ATTN_11DB)

pinTmp3 = ADC(Pin(39))
pinTmp3.atten(ADC.ATTN_11DB)

pinLambda1 = ADC(Pin(33))  # 14
pinLambda1.atten(ADC.ATTN_11DB)

pinLambdaHeater1 = Pin(26,Pin.OUT)
pinLambdaHeater1.off()

pinMapSwitch = Pin(14,Pin.OUT)
pinMapSwitch.off()

spi = SoftSPI(baudrate=500000, sck=Pin(18), mosi=Pin(23), miso=Pin(19))
cs = Pin(5, Pin.OUT)
ktypesense = max31855.MAX31855(spi, cs)

rpm = 0
maxRpm = 0
temp1 = 0.0 #Analog
temp2 = 0.0 #Analog
temp3 = 0.0 #Analog
temp4 = 0.0 #spi
voltage = 0.0
lambda1 = 0.0  # 0.68(0v) - 1,36(3.214V)

output1 = False
output2 = False

# org.bluetooth.service.environmental_sensing

# _ENV_SENSE_UUID = bluetooth.UUID("6e400001-b5a3-f393-e0a9-e50e24dcca9e")
_ENV_SENSE_UUID = bluetooth.UUID(0x181A)
_BLE_OUTPUT_UUID = bluetooth.UUID('19b10002-e8f2-537e-4f6c-d104768a1214')
# _ENV_SENSE_UUID = bluetooth.UUID("00001234-0000-1000-8000-00805f9b34fb")
# 00001234-0000-1000-8000-00805f9b34fb
# _ENV_SENSE_UUID = bluetooth.UUID(0x1825)
# _ENV_SENSE_UUID = 0x4c798e83010d41fd83dfbaba74e0ce0a #bluetooth.UUID(0x78c49c0567c24f409357967a94e4018c)
# org.bluetooth.characteristic.temperature
# _ENV_SENSE_TEMP_UUID = bluetooth.UUID(0xfa32)
_ENV_SENSE_TEMP_UUID = bluetooth.UUID(0x2A6E)
# org.bluetooth.characteristic.gap.appearance.xml
_ADV_APPEARANCE_GENERIC_THERMOMETER = const(768)  # const(384)

# How frequently to send advertising beacons.
_ADV_INTERVAL_MS = 250_000

#print("Service UUID")
#print(_ENV_SENSE_UUID)

#print("_ENV_SENSE_TEMP_UUID")
#print(_ENV_SENSE_TEMP_UUID)

# Register GATT server.
service = aioble.Service(_ENV_SENSE_UUID)
characteristic = aioble.Characteristic(service, _ENV_SENSE_TEMP_UUID, read=True, notify=True, indicate=True)
output_characteristic = aioble.Characteristic(service, _BLE_OUTPUT_UUID, read=True, write=True, notify=True, capture=True)

aioble.register_services(service)


def calcTemperature(vOut, r1, beta, ro):
    rt1 = r1 * vOut / (3.3 - min(3.2999, vOut))
    rt1 = max(0.00001, rt1)
    t0 = 298.15
    tempK = 1 / (1 / t0 + (math.log(rt1 / ro) / beta));  # Temperature in Kelvin
    tempC = tempK - 273.15
    return max(0, tempC)


def voltageDevider(u, r1, r2):
    return u * (r1 + r2) / r2


async def readInputs():
    global rpm
    global maxRpm
    global temp1
    global temp2
    global temp3
    global temp4
    global voltage
    global lambda1
    

    while True:
        # adcRaw = pinVoltage.read()
        # print(f"adcRaw {adcRaw} ")
        # adcVoltage = 3.3 * (adcRaw / 4095)
        # print(f"adcVoltage {adcVoltage}")

        adcVoltage = pinVoltage.read_uv() / 1000000
        #print(f"adcVoltage {adcVoltage}")

        voltage = adcVoltage * 4.0 #4.645
        #print(f"Voltage {voltage} ")

        # voltage2 = (adcVoltage2 * 6)
        # print(f"Voltage2 {voltage2} ")

        adcTmp1 = pinTmp1.read_uv() / 1000000  # 3.3 * (pinTmp1.read() / 4095)
        adcTmp2 = pinTmp2.read_uv() / 1000000  # 3.3 * (pinTmp2.read() / 4095)
        adcTmp3 = pinTmp3.read_uv() / 1000000  # 3.3 * (pinTmp2.read() / 4095)

        temp1 = calcTemperature(adcTmp1, 1740.0, 3950.0, 1800.0)
        temp2 = calcTemperature(adcTmp2, 1700.0, 3950.0, 1800.0)
        temp3 = calcTemperature(adcTmp3, 1700.0, 3950.0, 1800.0)

        #try:
        #    temp4 = ktypesense.read()
        #    print(f"ktypesense {temp4}")
        #except:
        #    print("ktypesense read err")

        #print(f"adcTmp1 {adcTmp1} temp1 {temp1} ")


        adcLambda1 = pinLambda1.read_uv() / 1000000
        #adcLambda2 = pinLambda2.read_uv() / 1000000
        #adcLambda3 = pinLambda3.read_uv() / 1000000
        #print(f"Lambda ADC {adcLambda1} {adcLambda2} {adcLambda3}")

        lambda1 = voltageDevider(adcLambda1, 10, 18)
        #lambda2 = voltageDevider(adcLambda2, 10, 18)
        #lambda3 = voltageDevider(adcLambda3, 10, 18)
        #print(f"Lambda {lambda1} {lambda2} {lambda3}")

        # try:
        #    rpmBytes = i2c.readfrom(8, 2)
        # rpm = struct.unpack(">H", rpmBytes)[0]

        rpm = min(rpm, 10000)
        maxRpm = max(rpm, maxRpm)
        #print(f"rpm {rpm} ")
        #test


        # except OSError:
        #    print("Arduino nicht verfuegbar")

        # rpm   short(2 bytes)
        # maxRpm short(2 bytes)
        # temp1 = unsigned char (1 bytes)
        # temp2 = unsigned char (1 bytes)
        # voltage = unsigned char (1 bytes)
        # lambda1 = unsigned char (1 bytes)
        # lambda2 = unsigned char (1 bytes)
        # lambda3 = unsigned char (1 bytes)

        # rpm = 11000
        # temp1 = 65
        # temp2 = 75
        # voltage = 12.6
        #if vl53.data_ready:
        #    vl53.clear_interrupt()
        #    print("Distance: {} cm".format(vl53.distance))

        data = struct.pack(">HHBBBBBB",
                           int(rpm),
                           int(maxRpm),
                           int(temp1),
                           int(temp2),
                           int(temp3),
                           int(temp4),
                           int(voltage * 10),
                           int(lambda1 * 100))
                           

        characteristic.write(data, send_update=True)
        await asyncio.sleep_ms(200)

async def writeOutputs():
    global output1
    global output2
    
    pinLambdaHeater1.value(output1)
    pinMapSwitch.value(output2)
    while True:
        if output_characteristic:
            connection, data = await output_characteristic.written()
            print(connection, data)
            if data and len(data) == 2:
                state = struct.unpack(">BB",data)
                print("received", state)
                output1 = state[0]
                output2 = state[1]
            else:
                print("Could not parse data")

        pinLambdaHeater1.value(output1)
        pinMapSwitch.value(output2)
        await asyncio.sleep_ms(200)




# Serially wait for connections. Don't advertise while a central is
# connected.
async def peripheral_task():
    while True:
        connection = await aioble.advertise(
            _ADV_INTERVAL_MS,
            name="Penis",
            services=[_ENV_SENSE_UUID],
            appearance=_ADV_APPEARANCE_GENERIC_THERMOMETER,
            manufacturer=(0xabcd, b"1234"),
        )
        print("Connection from", connection.device)


lastTotalTicks = 0
totalTicks = 0
dTs = 0.5
frequency = 1 / dTs

def triggerRpmPin(p):
    global totalTicks
    totalTicks = totalTicks + 1

rpmPin = Pin(27,Pin.IN)
rpmPin.irq(trigger=Pin.IRQ_RISING, handler=triggerRpmPin)


def calcRpm(p):
    global rpm
    global totalTicks
    global lastTotalTicks

    ticks = totalTicks - lastTotalTicks
    lastTotalTicks = totalTicks
    rpm = 60 * ticks / dTs

rpmTimer = Timer(0)
rpmTimer.init(mode=Timer.PERIODIC, freq=frequency, callback=calcRpm)


# Run both tasks.
async def main():
    t1 = asyncio.create_task(readInputs())
    t2 = asyncio.create_task(peripheral_task())
    t3 = asyncio.create_task(writeOutputs())
    # t3 = asyncio.create_task(readRpm())
    await asyncio.gather(t1, t2, t3)


asyncio.run(main())
