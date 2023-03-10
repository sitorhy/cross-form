import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";
import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type {VueRoutedEventArgs} from "@/components/vue/types";

export default abstract class HubProcessorSubscription implements EventSubscription {

    private readonly _sourceSubscription: EventSubscription;

    private readonly _processor: HubProcessor;

    private readonly _subscriber: EventSubscriber;

    // 上一级订阅协议
    get sourceSubscription(): EventSubscription {
        return this._sourceSubscription;
    }

    get processor(): HubProcessor {
        return this._processor;
    }

    get subscriber(): EventSubscriber {
        return this._subscriber;
    }

    get event(): VueRoutedEventArgs {
        return this.sourceSubscription.event;
    }

    constructor(sourceSubscription: EventSubscription, processor: HubProcessor, subscriber: EventSubscriber) {
        this._sourceSubscription = sourceSubscription;
        this._processor = processor;
        this._subscriber = subscriber;
    }

    cancel(): void {
    }

    abstract request(): void;
}