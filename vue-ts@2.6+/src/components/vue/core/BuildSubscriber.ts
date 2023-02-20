import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type {Subscriber} from "@/components/core/Flow";
import type HubSubscription from "@/components/vue/core/HubSubscription";
import type HubPublisher from "@/components/vue/core/HubPublisher";
import type HubProcessor from "@/components/vue/core/HubProcessor";

import Events from "@/components/vue/core/Events";
import EventSubscriberSupport from "@/components/vue/core/EventSubscriberSupport";
import BuildSubscription from "@/components/vue/core/BuildSubscription";

export default class BuildSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return Events.BUILD === event.event;
    }

    delegate(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, processor: HubProcessor, event: VueRoutedEventArgs): HubProcessorSubscription {
        return new BuildSubscription(subscriber, publisher, processor, event);
    }
}