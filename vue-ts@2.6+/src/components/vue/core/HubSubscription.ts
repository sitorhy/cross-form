import type {Subscriber, Subscription} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type HubPublisher from "@/components/vue/core/HubPublisher";


export default class HubSubscription implements Subscription {
    subscriber: Subscriber<RoutedEventArgs<VueSubmission, Vue>>;

    publisher: HubPublisher;

    event: RoutedEventArgs<VueSubmission, Vue>;

    constructor(subscriber: Subscriber<RoutedEventArgs<VueSubmission, Vue>>, publisher: HubPublisher, event: RoutedEventArgs<VueSubmission, Vue>) {
        this.subscriber = subscriber;
        this.publisher = publisher;
        this.event = event;
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