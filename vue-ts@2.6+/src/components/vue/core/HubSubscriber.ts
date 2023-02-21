import type {Subscriber} from "@/components/core/Flow";
import type {VueRoutedEventArgs} from "@/components/vue/types";
import type EventSubscription from "@/components/vue/core/EventSubscription";

/**
 * 响应自定义事件和默认的异常处理机制，建议从该类派生顶层订阅器
 */
export default class HubSubscriber implements Subscriber<VueRoutedEventArgs, EventSubscription> {
    onComplete(): void {

    }

    onError(error: unknown): void {

    }

    onNext(item: VueRoutedEventArgs): void {

    }

    /**
     * 默认的闭环实现
     * @param subscription 顶层订阅器需要派生该协议
     */
    onSubscribe(subscription: EventSubscription): void {
        subscription.request();
    }
}