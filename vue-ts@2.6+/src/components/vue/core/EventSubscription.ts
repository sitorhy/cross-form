import type {Subscription} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";

export default interface EventSubscription extends Subscription {
    get event(): VueRoutedEventArgs;
}