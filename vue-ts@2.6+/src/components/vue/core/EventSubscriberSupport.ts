import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type {Subscriber} from "@/components/core/Flow";
import type HubPublisher from "@/components/vue/core/HubPublisher";
import type HubProcessor from "@/components/vue/core/HubProcessor";

export default abstract class EventSubscriberSupport implements EventSubscriber {
    abstract accept(event: VueRoutedEventArgs): boolean;

    abstract delegate(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, processor: HubProcessor, event: VueRoutedEventArgs): HubProcessorSubscription;

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