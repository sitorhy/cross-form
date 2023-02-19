import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";

import Events from "@/components/vue/core/Events";

export default class BuildSubscriber implements EventSubscriber {
    accept(event: VueRoutedEventArgs): boolean {
        return Events.BUILD === event.event;
    }

    onComplete(): void {
    }

    onError(error: unknown): void {
    }

    onNext(item: VueRoutedEventArgs): void {
    }

    onSubscribe(subscription: HubSubscription): void {
        subscription.request();
    }

}