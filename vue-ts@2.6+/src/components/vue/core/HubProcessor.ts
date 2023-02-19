import type {Publisher, Subscriber} from "@/components/core/Flow";
import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubSubscription from "@/components/vue/core/HubSubscription";

import BuildSubscriber from "@/components/vue/core/BuildSubscriber";
import HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";

export default class HubProcessor implements Publisher<VueRoutedEventArgs, HubSubscription, EventSubscriber>, Subscriber<VueRoutedEventArgs, HubSubscription> {
    private _subscribers: EventSubscriber[] = [];

    get subscribers(): EventSubscriber[] {
        return this._subscribers;
    }

    constructor() {
        this.subscribe(new BuildSubscriber());
    }

    onComplete(): void {
    }

    onError(error: unknown): void {
    }

    onNext(item: VueRoutedEventArgs): void {
    }

    onSubscribe(subscription: HubSubscription): void {
        for (const subscriber of this.subscribers) {
            if (!subscription.event.handled) {
                if (subscriber.accept(subscription.event)) {
                    subscriber.onSubscribe(new HubProcessorSubscription(subscription.subscriber, subscription.publisher, this, subscription.event));
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