import type {Publisher, Subscriber, Subscription} from "@/components/core/Flow";
import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type EventSubscription from "@/components/vue/core/EventSubscription";

import BuildSubscriber from "@/components/vue/core/BuildSubscriber";
import HubSubscriber from "@/components/vue/core/HubSubscriber";

export default class HubProcessor extends HubSubscriber implements Publisher<VueRoutedEventArgs, HubSubscription, EventSubscriber> {
    private _subscribers: EventSubscriber[] = [];

    get subscribers(): EventSubscriber[] {
        return this._subscribers;
    }

    constructor() {
        super();
        this.subscribe(new BuildSubscriber());
    }

    onSubscribe(subscription: EventSubscription) {
        for (const subscriber of this.subscribers) {
            if (!subscription.event.handled) {
                if (subscriber.accept(subscription.event)) {
                    subscriber.onSubscribe(subscriber.delegate(subscription, this));
                } else {
                    subscription.request();
                }
            } else {
                break;
            }
        }
    }

    subscribe(subscriber: EventSubscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }
}