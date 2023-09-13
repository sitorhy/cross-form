import HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import MemoryCollector from "@/components/vue/core/MemoryCollector";

export default class RegisterSubscription extends HubProcessorSubscription {
    request(): void {
        const submission = this.event.data;
        const member = submission.member;
        if (!member) {
            throw new Error(`register collector failed, empty "member" is not allowed.`);
        }
        const document = this.processor.document;
        const description = submission.description;
        const collector = new MemoryCollector(member, description?.classifications);
        document.register(member, collector);
        this.subscriber.onComplete();
    }
}