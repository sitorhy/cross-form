import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";

export default class EventSubscriberSupport implements EventSubscriber {
    accept(event: VueRoutedEventArgs): boolean {
        return false;
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