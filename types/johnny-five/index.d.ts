// index.d.ts

import * as five from 'johnny-five'

declare module 'johnny-five' {
  export interface IMultiGeneralOption {
    /** The Name of the controller to use */
    controller:
      | 'BMP180'
      | 'BMP280'
      | 'BME280'
      | 'HTU21D'
      | 'HIH6130'
      | 'MPL115A2'
      | 'MPL3115A2'
      | 'SI7020'
      | 'SI7021'
      | 'MS5611'
      | 'TH02'
    /** In milliseconds, how often data events should fire @default 20 */
    freq?: number | undefined
  }

  /**
   * The Multi class constructs objects that represent a single "breakout" module
   * attached to the physical board. The "breakout" module will itself contain 2 or
   * more components, such as a thermistor and a hygrometer, or an altimeter and
   * a pressure sensor.
   *
   * @source http://johnny-five.io/api/multi/
   */
  export class Multi {
    constructor(option: IMultiGeneralOption)

    // Some of these properties may or may not exist depending on whether the multi sensor supports it.

    /** An instance of Accelerometer class. */
    readonly accelerometer: Accelerometer
    /** An instance of Altimeter class. */
    readonly altimeter: Altimeter
    /** An instance of Barometer class. */
    readonly barometer: any //ToDo: Find and connect Barometer
    /** An instance of Gyro class. */
    readonly gyro: Gyro
    /** An instance of Hygrometer class. */
    readonly hygrometer: Hygrometer
    /** An instance of Thermometer class. */
    readonly thermometer: Thermometer

    // The Multi class does not have an explicit API. Refer to the individual components for their APIs

    /**  The "change" event is fired whenever a corresponding "change" is fired from any constituent component. */
    on(event: 'change', cb: () => void): this
    /** The "data" event is fired as frequently as new data becomes available. */
    on(event: 'data', cb: (data: any) => void): this

    //Note: You may also bind to events on Multi object component sensors directly, e.g. myMulti.thermometer.on('change')
  }
}
