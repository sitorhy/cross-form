import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type EventSubscription from "@/components/vue/core/EventSubscription";

import Events from "@/components/vue/core/Events";
import EventSubscriberSupport from "@/components/vue/core/EventSubscriberSupport";
import RegisterSubscription from "@/components/vue/core/RegisterSubscription";

export default class RegisterSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return Events.REGISTER === event.event;
    }

    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription {
        return new RegisterSubscription(subscription, processor, this);
    }
}