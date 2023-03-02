import type {Publisher} from "@/components/core/Flow";
import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type EventSubscription from "@/components/vue/core/EventSubscription";
import type {Document} from "@/components/core/Document";

import BuildSubscriber from "@/components/vue/core/BuildSubscriber";
import HubSubscriber from "@/components/vue/core/HubSubscriber";
import MemoryDocument from "@/components/vue/core/MemoryDocument";

export default class HubProcessor extends HubSubscriber implements Publisher<VueRoutedEventArgs, EventSubscription, EventSubscriber> {
    private _subscribers: EventSubscriber[] = [];

    private readonly _document: Document;


    get subscribers(): EventSubscriber[] {
        return this._subscribers;
    }

    get document(): Document {
        return this._document;
    }

    constructor() {
        super();
        this.subscribe(new BuildSubscriber());
        this._document = new MemoryDocument();
    }

    onSubscribe(subscription: EventSubscription) {
        for (const subscriber of this.subscribers) {
            if (!subscription.event.handled) {
                if (subscriber.accept(subscription.event)) {
                    // 转发
                    subscriber.onSubscribe(subscriber.delegate(subscription, this));
                }
            } else {
                break;
            }
        }
        // 闭环
        subscription.request();
    }

    subscribe(subscriber: EventSubscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }
}