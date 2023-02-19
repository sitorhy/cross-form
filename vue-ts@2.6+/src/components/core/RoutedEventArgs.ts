import EventArgs from "./EventArgs";

const HandledSign = Symbol("_handled");

export default class RoutedEventArgs<T, S = Record<string, any>> extends EventArgs<T, S> {
    constructor(originalSource: S, event: string, data: T) {
        super(originalSource, event, data);
        Object.defineProperty(this, HandledSign, {
            enumerable: false,
            configurable: true,
            value: false,
            writable: true
        });
    }

    get handled(): boolean {
        return Reflect.get(this, HandledSign);
    }

    set handled(value) {
        Reflect.set(this, HandledSign, value);
    }
}
