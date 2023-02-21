import type {Publisher} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type EventSubscription from "@/components/vue/core/EventSubscription";
import type HubSubscriber from "@/components/vue/core/HubSubscriber";

import HubSubscription from "@/components/vue/core/HubSubscription";
import HubProcessor from "@/components/vue/core/HubProcessor";

export default class HubPublisher implements Publisher<VueRoutedEventArgs, EventSubscription, HubSubscriber> {

    private _subscribers: HubSubscriber[] = [];

    get subscribers(): HubSubscriber[] {
        return this._subscribers;
    }

    constructor() {
        this.subscribe(new HubProcessor());
    }

    protected dispatch(subscriber: HubSubscriber, event: VueRoutedEventArgs) {
        subscriber.onSubscribe(new HubSubscription(this, subscriber, event));
    }

    submit(event: VueRoutedEventArgs) {
        for (const subscriber of this.subscribers) {
            if (!event.handled) {
                if (subscriber) {
                    try {
                        this.dispatch(subscriber, event);
                    } catch (e: unknown) {
                        // 捕获大部分同步订阅器异常
                        subscriber.onError(e);
                    }
                }
            } else {
                break;
            }
        }
    }

    subscribe(subscriber: HubSubscriber): void {
        if (subscriber && !this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

}
