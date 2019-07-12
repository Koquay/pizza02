import { AlertType } from './alert-type.enum';
import { AlertPromise } from 'selenium-webdriver';

export class Alert {
    constructor(public text:string, public type=AlertType.SUCCESS) {
        console.log('Alert: ', text, type);
    }
}
