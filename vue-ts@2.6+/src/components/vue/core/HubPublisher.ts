import type {Publisher, Subscriber, Subscription} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";

import HubSubscription from "@/components/vue/core/HubSubscription";
import HubProcessor from "@/components/vue/core/HubProcessor";

export default class HubPublisher implements Publisher<VueRoutedEventArgs, Subscription, Subscriber<VueRoutedEventArgs, Subscription>> {
    private _subscribers: Subscriber<VueRoutedEventArgs, Subscription>[] = [];

    get subscribers(): Subscriber<VueRoutedEventArgs, Subscription>[] {
        return this._subscribers;
    }

    constructor() {
        this.subscribe(new HubProcessor());
    }

    subscribe(subscriber: Subscriber<VueRoutedEventArgs, Subscription>): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

    submit(event: VueRoutedEventArgs) {
        for (const subscriber of this.subscribers) {
            if (!event.handled) {
                subscriber.onSubscribe(new HubSubscription(subscriber, this, event));
            } else {
                break;
            }
        }
    }
}
