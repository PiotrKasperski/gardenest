import * as Rx from 'rxjs/Rx';
import * as fs from 'fs';
import * as watchRx from 'watch-rx';

export class TemperatureFileService {
  private filePath = `/home/klonek/development/gardenjs/gardenjs/gardenest/src/hardwareModule/temperatureSensorModule/temperatureSensorFile.mock`;
  private sensorValueObservatore: Rx.Observable<number>;
  private sensorValue: number = 0;
  private watcher;

  constructor(w1sensorAddress: string) {
    this.filePath = '/sys/bus/w1/devices/' + '28-00000a049409' + '/w1_slave';
    this.setValue();
    //this.watchFileForChange();
    this.watchFile();
  }
  private setValue() {
    this.sensorValueRead(value => {
      this.sensorValue = value;
    });
  }

  private sensorValueRead(cb) {
    fs.readFile(
      '/sys/bus/w1/devices/' + '28-00000a049409' + '/w1_slave',
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        cb(
          Number.parseInt(
            data.toString().substr(data.toString().search('t=') + 2, 5),
          ) / 1000,
        );
      },
    );
  }
  private createfileObservable() {
    return Rx.Observable.bindCallback(this.sensorValueRead);
  }
  private watchFile() {
    this.watcher = watchRx.watchRx(this.filePath).subscribe(data => {
      console.log(`watcher work: ${data}`);
    });
  }

  private watchFileForChange() {
    fs.watchFile(this.filePath, () => {
      this.setValue();
    });
  }
  public watchSensorValueChangeObservable() {
    /*      return this.sensorValueObservable().merge(this.watcher, (value , changed)=>{
            console.log(`value: ${value}`)
            return value;
        }) */
  }

  public sensorValueObservable(): Rx.Observable<number> {
    let intObserver: any = this.createfileObservable();
    return intObserver();
  }
  public getSensorValue(): number {
    this.setValue();
    return this.sensorValue;
  }
}
