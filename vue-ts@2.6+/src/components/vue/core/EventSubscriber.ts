import type {Subscriber} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import type HubProcessor from "@/components/vue/core/HubProcessor";
import type EventSubscription from "@/components/vue/core/EventSubscription";

export default interface EventSubscriber extends Subscriber<VueRoutedEventArgs, EventSubscription> {
    /**
     * �������Ƿ������¼�
     * @param event
     */
    accept(event: VueRoutedEventArgs): boolean;

    /**
     * �¼����¼�����Э�顢��������һ��ģ��ɶ�����ָ��Э���Ϊ����
     * @param subscription
     * @param processor
     */
    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription;
}