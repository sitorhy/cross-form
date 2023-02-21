import type {Subscription} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type Vue from "vue";

export default interface EventSubscription extends Subscription {
    get event(): RoutedEventArgs<VueSubmission, Vue>;
}