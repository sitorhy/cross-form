import type EventSubscriber from "@/components/vue/core/EventSubscriber";
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

    /**
     * 受理转发的协议，该方法一般不需要重载，如需要与上级协议交互应该重载协议实现
     * @param subscription
     */
    onSubscribe(subscription: EventSubscription): void {
        subscription.request();
    }

}