import type {VueRoutedEventArgs} from "../src/components/vue/types";
import type HubSubscription from "../src/components/vue/core/HubSubscription";
import type EventSubscription from "../src/components/vue/core/EventSubscription";

import {describe, expect, test} from "@jest/globals";
import HubPublisher from "../src/components/vue/core/HubPublisher";
import VueSubmission from "../src/components/vue/core/VueSubmission";
import RoutedEventArgs from "../src/components/core/RoutedEventArgs";
import EventSubscriberSupport from "../src/components/vue/core/EventSubscriberSupport";
import HubProcessorSubscription from "../src/components/vue/core/HubProcessorSubscription";
import HubProcessor from "../src/components/vue/core/HubProcessor";
import HubSubscriber from "../src/components/vue/core/HubSubscriber";
import Vue from "vue";

(function () {
    // HubSubscriber 闭环处理检查 没有输出即流程闭环有问题
    const onSubscribe = HubSubscriber.prototype.onSubscribe;
    HubSubscriber.prototype.onSubscribe = function (s) {
        console.log('HubSubscriber.onSubscribe');
        onSubscribe.call(this, s);
    };

    const onComplete = HubSubscriber.prototype.onComplete;
    HubSubscriber.prototype.onComplete = function () {
        console.log('HubSubscriber.onComplete');
        onComplete.call(this);
    };
})();

(function () {
    // HubProcessor 闭环处理检查 由于 HubSubscriber.onSubscribe 被重载 HubSubscriber Hook不会被调用
    const onSubscribe = HubProcessor.prototype.onSubscribe;
    HubProcessor.prototype.onSubscribe = function (s) {
        console.log('HubProcessor.onSubscribe');
        onSubscribe.call(this, s);
    };
})();


class InnerEventSubscription extends HubProcessorSubscription {
    request() {
        console.log(`Type of subscription: ${this.constructor.name}`);
        this.subscriber.onComplete();
    }
}

/**
 * 内置事件订阅模拟
 */
class InnerEventSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return event.event === 'INNER';
    }

    delegate(subscription: EventSubscription, processor: HubProcessor): HubProcessorSubscription {
        return new InnerEventSubscription(subscription, processor, this);
    }
}


/**
 * 自定义事件订阅模拟
 */
class CustomPublicSubscriber extends HubSubscriber {
    private subscription: HubSubscription | undefined;

    onSubscribe(subscription: HubSubscription) {
        console.log(`Custom Event Subscriber onSubscribe: ${subscription.event.event}`);
        this.subscription = subscription;
        super.onSubscribe(subscription);
    }

    onComplete() {
        console.log(`Custom Event Subscriber onComplete: ${this.subscription ? this.subscription.event.event : ''}`);
        this.subscription = undefined;
        super.onComplete();
    }
}

describe('框架流程测试', () => {
    const vm = new Vue();
    const submission = new VueSubmission();
    const publisher = new HubPublisher();

    test('内置事件流程', () => {
        const processor = publisher.subscribers.find(i => i instanceof HubProcessor) as HubProcessor;
        expect(processor).toBeTruthy();
        if (processor) {
            processor.subscribe(new InnerEventSubscriber());
            const event: VueRoutedEventArgs = new RoutedEventArgs<VueSubmission, Vue>(vm, 'INNER', submission);
            publisher.submit(event);
        }
    });

    test('自定义事件流程', () => {
        // 排除干扰，先清空内置的订阅器
        publisher.subscribers.splice(0);

        publisher.subscribe(new CustomPublicSubscriber());
        const event: VueRoutedEventArgs = new RoutedEventArgs<VueSubmission, Vue>(vm, 'CUSTOM', submission);
        publisher.submit(event);
    });
});