import { EtherPortClient } from 'etherport-client'
import { Board, Multi } from 'johnny-five'

import { Board as IBoard } from 'johnny-five'
import { Multi as IMulti } from 'johnny-five'

//Hardware:
//Board manager: esp8266 v2.7.4
//Board: NodeMCU 1.0 (ESP-12E Module)
//Firmware: Firmata v2.5.8
//Sensor: HTU21D - I2C https://www.adafruit.com/product/1899

//Met issues:
//1. Board manager v3.0.2 could not be flashed - no idea why
//2. Used Johnny-Five v2.1.0 generates warning at each a new library - gyp info
//Readmore: https://github.com/rwaldron/johnny-five/issues/1786
//3. @types/johnny-five does not support Multi class

const board: IBoard = new Board({
  port: new EtherPortClient({
    host: '192.168.8.122',
    port: 3030,
  }),
  repl: false,
})

board.on('ready', (): void => {
  const multi: IMulti = new Multi({
    controller: 'HTU21D',
  })

  multi.on('change', (): void => {
    console.log('Thermometer')
    console.log('  celsius           : ', multi.thermometer.celsius)
    console.log('  fahrenheit        : ', multi.thermometer.fahrenheit)
    console.log('  kelvin            : ', multi.thermometer.kelvin)
    console.log('--------------------------------------')

    console.log('Hygrometer')
    console.log('  relative humidity : ', multi.hygrometer.relativeHumidity)
    console.log('--------------------------------------')
  })
})
