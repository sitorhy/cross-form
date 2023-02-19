import type {Subscriber, Subscription} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type HubPublisher from "@/components/vue/core/HubPublisher";
import type {VueRoutedEventArgs} from "@/components/vue/types";


export default class HubSubscription implements Subscription {
    private readonly _subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>;

    private readonly _publisher: HubPublisher;

    private readonly _event: RoutedEventArgs<VueSubmission, Vue>;

    get subscriber(): Subscriber<VueRoutedEventArgs, HubSubscription> {
        return this._subscriber;
    }

    get publisher(): HubPublisher {
        return this._publisher;
    }

    get event(): RoutedEventArgs<VueSubmission, Vue> {
        return this._event;
    }

    constructor(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, event: VueRoutedEventArgs) {
        this._subscriber = subscriber;
        this._publisher = publisher;
        this._event = event;
    }

    cancel(): void {
        const index = this.publisher.subscribers.indexOf(this.subscriber);
        if (index >= 0) {
            this.publisher.subscribers.splice(index, 1);
        }
    }

    request(): void {

    }
}