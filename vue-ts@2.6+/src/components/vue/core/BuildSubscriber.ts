import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type EventSubscription from "@/components/vue/core/EventSubscription";

import Events from "@/components/vue/core/Events";
import EventSubscriberSupport from "@/components/vue/core/EventSubscriberSupport";
import BuildSubscription from "@/components/vue/core/BuildSubscription";

export default class BuildSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return Events.BUILD === event.event;
    }

    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription {
        return new BuildSubscription(subscription, processor);
    }

}