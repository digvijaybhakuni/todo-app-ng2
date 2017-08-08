export class Alert {
    type: AlertType;
    message: string;
    cb: Function;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
}