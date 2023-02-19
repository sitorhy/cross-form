const OriginalSourceSign = Symbol("_originalSource");
const SourceSign = Symbol("_source");
const EventSign = Symbol("_event");
const DataSign = Symbol("_data");
const TimeSign = Symbol("_timestamp");

export default class EventArgs<T, S = Record<string, any>> {
    constructor(originalSource: S, event: string, data: T) {
        Object.defineProperty(this, OriginalSourceSign, {
            enumerable: false,
            configurable: false,
            value: originalSource
        });

        Object.defineProperty(this, SourceSign, {
            enumerable: false,
            configurable: false,
            writable: true,
            value: null
        });

        Object.defineProperty(this, EventSign, {
            enumerable: false,
            configurable: false,
            value: event
        });

        Object.defineProperty(this, DataSign, {
            enumerable: false,
            configurable: false,
            value: data
        });

        Object.defineProperty(this, TimeSign, {
            enumerable: false,
            configurable: false,
            value: Date.now()
        });
    }

    get originalSource(): S {
        return Reflect.get(this, OriginalSourceSign);
    }

    get event(): string {
        return Reflect.get(this, EventSign);
    }

    get data(): T {
        return Reflect.get(this, DataSign);
    }

    get source(): any {
        return Reflect.get(this, SourceSign);
    }

    set source(value: any) {
        Reflect.set(this, SourceSign, value);
    }

    get timestamp(): number {
        return Reflect.get(this, TimeSign);
    }
}
