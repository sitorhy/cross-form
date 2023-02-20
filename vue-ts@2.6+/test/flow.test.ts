import type {VueRoutedEventArgs} from "../src/components/vue/types";
import type HubSubscription from "../src/components/vue/core/HubSubscription";

import {describe, expect, test} from "@jest/globals";
import HubPublisher from "../src/components/vue/core/HubPublisher";
import VueSubmission from "../src/components/vue/core/VueSubmission";
import RoutedEventArgs from "../src/components/core/RoutedEventArgs";
import EventSubscriberSupport from "../src/components/vue/core/EventSubscriberSupport";
import HubProcessor from "../src/components/vue/core/HubProcessor";
import Vue from "vue";

class TestEventSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return event.event === 'TEST';
    }

    onSubscribe(subscription: HubSubscription) {
        console.log('TestEventSubscriber onSubscribe trigger');
        console.log(`Type of subscription: ${subscription.constructor.name}`);
    }
}

describe('框架流程测试', () => {
    test('分发流程', () => {
        const vm = new Vue();
        const submission = new VueSubmission();
        const publisher = new HubPublisher();
        const processor = publisher.subscribers.find(i => i instanceof HubProcessor) as HubProcessor;
        expect(processor).toBeTruthy();
        if (processor) {
            processor.subscribe(new TestEventSubscriber());
            const event: VueRoutedEventArgs = new RoutedEventArgs<VueSubmission, Vue>(vm, 'TEST', submission);
            publisher.submit(event);
        }
    });
});