import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type Vue from "vue";

export default abstract class HubProcessorSubscription implements EventSubscription {

    private readonly _eventSubscription: EventSubscription;

    private readonly _processor: HubProcessor;

    // 上一级订阅协议
    get eventSubscription(): EventSubscription {
        return this._eventSubscription;
    }

    get processor(): HubProcessor {
        return this._processor;
    }

    get event(): RoutedEventArgs<VueSubmission, Vue> {
        return this.eventSubscription.event;
    }

    constructor(eventSubscription: EventSubscription, processor: HubProcessor) {
        this._eventSubscription = eventSubscription;
        this._processor = processor;
    }

    cancel(): void {
    }

    abstract request(): void;
}