import type {Subscriber} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type Vue from "vue";

export default interface EventSubscriber extends Subscriber<RoutedEventArgs<VueSubmission, Vue>> {
    accept(event: RoutedEventArgs<VueSubmission, Vue>): boolean;
}