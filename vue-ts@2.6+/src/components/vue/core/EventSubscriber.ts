import type {Subscriber} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";

export default interface EventSubscriber extends Subscriber<VueRoutedEventArgs, EventSubscription> {
    /**
     * 订阅器是否受理事件
     * @param event
     */
    accept(event: VueRoutedEventArgs): boolean;

    /**
     * 事件、事件处理协议、订阅器是一组的，由订阅器指定协议更为合理
     * @param subscription
     * @param processor
     */
    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription;
}