import type {VueRoutedEventArgs} from "../src/components/vue/types";
import type HubSubscription from "../src/components/vue/core/HubSubscription";
import type {Subscriber} from "../src/components/core/Flow";

import {describe, expect, test} from "@jest/globals";
import HubPublisher from "../src/components/vue/core/HubPublisher";
import VueSubmission from "../src/components/vue/core/VueSubmission";
import RoutedEventArgs from "../src/components/core/RoutedEventArgs";
import EventSubscriberSupport from "../src/components/vue/core/EventSubscriberSupport";
import HubProcessorSubscription from "../src/components/vue/core/HubProcessorSubscription";
import HubProcessor from "../src/components/vue/core/HubProcessor";
import Vue from "vue";

class TestSubscription extends HubProcessorSubscription {
    request() {
        console.log(`Type of subscription: ${this.constructor.name}`);
    }
}

class TestEventSubscriber extends EventSubscriberSupport {
    accept(event: VueRoutedEventArgs): boolean {
        return event.event === 'TEST';
    }

    delegate(subscriber: Subscriber<VueRoutedEventArgs, HubSubscription>, publisher: HubPublisher, processor: HubProcessor, event: VueRoutedEventArgs): HubProcessorSubscription {
        return new TestSubscription(subscriber, publisher, processor, event);
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