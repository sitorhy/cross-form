import type {Subscriber} from "@/components/core/Flow";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type {VueRoutedEventArgs} from "@/components/vue/types";

export default interface EventSubscriber extends Subscriber<VueRoutedEventArgs, HubSubscription> {
    accept(event: VueRoutedEventArgs): boolean;
}