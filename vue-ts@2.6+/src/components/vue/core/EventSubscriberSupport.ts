import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";

export default abstract class EventSubscriberSupport implements EventSubscriber {
    abstract accept(event: VueRoutedEventArgs): boolean;

    abstract delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription;

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