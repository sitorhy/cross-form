import type HubProcessor from "@/components/vue/core/HubProcessor";
import type {Subscriber} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubPublisher from "@/components/vue/core/HubPublisher";

import HubSubscription from "@/components/vue/core/HubSubscription";

export default abstract class HubProcessorSubscription extends HubSubscription {
    private readonly _processor: HubProcessor;

    get processor(): HubProcessor {
        return this._processor;
    }

    constructor(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, processor: HubProcessor, event: VueRoutedEventArgs) {
        super(subscriber, publisher, event);
        this._processor = processor;
    }

    abstract request(): void;
}