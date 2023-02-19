import type {Publisher, Subscriber} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type Vue from "vue";

import HubSubscription from "@/components/vue/core/HubSubscription";
import HubProcessor from "@/components/vue/core/HubProcessor";

export default class HubPublisher implements Publisher<RoutedEventArgs<VueSubmission, Vue>, Subscriber<RoutedEventArgs<VueSubmission, Vue>>> {
    subscribers: Subscriber<RoutedEventArgs<VueSubmission, Vue>>[] = [];

    constructor() {
        this.subscribe(new HubProcessor());
    }

    subscribe(subscriber: Subscriber<RoutedEventArgs<VueSubmission, Vue>>): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

    submit(event: RoutedEventArgs<VueSubmission, Vue>) {
        for (const subscriber of this.subscribers) {
            if (!event.handled) {
                subscriber.onSubscribe(new HubSubscription(subscriber, this, event));
            } else {
                break;
            }
        }
    }
}
