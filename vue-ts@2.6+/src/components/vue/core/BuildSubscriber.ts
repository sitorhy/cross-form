import type {VueRoutedEventArgs} from "@/components/vue/types";

import Events from "@/components/vue/core/Events";
import EventSubscriberSupport from "@/components/vue/core/EventSubscriberSupport";

export default class BuildSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return Events.BUILD === event.event;
    }
}