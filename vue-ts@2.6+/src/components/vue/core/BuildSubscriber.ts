import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type {Subscription} from "@/components/core/Flow";
import type Vue from "vue";

import Events from "@/components/vue/core/Events";

export default class BuildSubscriber implements EventSubscriber {
    accept(event: RoutedEventArgs<VueSubmission, Vue>): boolean {
        return event.event === Events.BUILD;
    }

    onComplete(): void {
    }

    onError(error: unknown): void {
    }

    onNext(item: RoutedEventArgs<VueSubmission, Vue>): void {
    }

    onSubscribe(subscription: Subscription): void {
    }

}