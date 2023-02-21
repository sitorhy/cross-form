import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type HubPublisher from "@/components/vue/core/HubPublisher";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type EventSubscription from "@/components/vue/core/EventSubscription";
import type HubSubscriber from "@/components/vue/core/HubSubscriber";
import type Vue from "vue";


export default class HubSubscription implements EventSubscription {

    private readonly _publisher: HubPublisher;

    private readonly _subscriber: HubSubscriber;

    private readonly _event: RoutedEventArgs<VueSubmission, Vue>;

    get publisher(): HubPublisher {
        return this._publisher;
    }

    get subscriber(): HubSubscriber {
        return this._subscriber;
    }

    get event(): RoutedEventArgs<VueSubmission, Vue> {
        return this._event;
    }

    constructor(publisher: HubPublisher, subscriber: HubSubscriber, event: VueRoutedEventArgs) {
        this._publisher = publisher;
        this._subscriber = subscriber;
        this._event = event;
    }

    cancel(): void {
        const index = this.publisher.subscribers.indexOf(this.subscriber);
        if (index >= 0) {
            this.publisher.subscribers.splice(index, 1);
        }
    }

    /**
     * 默认的闭环实现
     */
    request(): void {
        this.subscriber.onComplete();
    }
}