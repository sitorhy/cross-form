import type {Subscriber} from "@/components/core/Flow";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type HubPublisher from "@/components/vue/core/HubPublisher";
import type HubProcessor from "@/components/vue/core/HubProcessor";

export default interface EventSubscriber extends Subscriber<VueRoutedEventArgs, HubSubscription> {
    accept(event: VueRoutedEventArgs): boolean;

    delegate(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, processor: HubProcessor, event: VueRoutedEventArgs): HubProcessorSubscription;
}