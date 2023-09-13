import HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";

export default class BuildSubscription extends HubProcessorSubscription {
    request(): void {
        const description = this.event.data.description;
        if (description) {
            this.processor.document.build(description);
            this.subscriber.onComplete();
        } else {
            throw new Error(`build relation container failed, param "relation" is required.`)
        }
    }
}