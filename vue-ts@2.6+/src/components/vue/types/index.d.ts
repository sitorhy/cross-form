import HubPublisher from "@/components/vue/core/HubPublisher";
import VueSubmission from "@/components/vue/core/VueSubmission";
import RoutedEventArgs from "@/components/core/RoutedEventArgs";
import Vue from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        $publisher: HubPublisher,
        _uid: number
    }
}

export type VueRoutedEventArgs = RoutedEventArgs<VueSubmission, Vue>;