import type {Publisher, Subscriber, Subscription} from "@/components/core/Flow";
import type RoutedEventArgs from "@/components/core/RoutedEventArgs";
import type VueSubmission from "@/components/vue/core/VueSubmission";
import type EventSubscriber from "@/components/vue/core/EventSubscriber";
import type Vue from "vue";
import BuildSubscriber from "@/components/vue/core/BuildSubscriber";

export default class HubProcessor implements Publisher<RoutedEventArgs<VueSubmission, Vue>, EventSubscriber>, Subscriber<RoutedEventArgs<VueSubmission, Vue>> {

    subscribers: EventSubscriber[] = [];

    constructor() {
        this.subscribe(new BuildSubscriber());
    }

    onComplete(): void {
    }

    onError(error: unknown): void {
    }

    onNext(item: RoutedEventArgs<VueSubmission, Vue>): void {

    }

    onSubscribe(subscription: Subscription): void {
        subscription.request();
    }

    subscribe(subscriber: EventSubscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }
}