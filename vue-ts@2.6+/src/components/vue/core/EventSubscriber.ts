import type {Subscriber} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";

export default interface EventSubscriber extends Subscriber<VueRoutedEventArgs, EventSubscription> {
    accept(event: VueRoutedEventArgs): boolean;

    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription;
}