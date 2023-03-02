import HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";
import VueRelationDescription from "@/components/vue/core/VueRelationDescription";

export default class BuildSubscription extends HubProcessorSubscription {
    request(): void {
        if (this.event.data.relation) {
            const description: VueRelationDescription = new VueRelationDescription(this.event.data.relation);
            this.processor.document.draft(description);
            this.subscriber.onComplete();
        } else {
            throw new Error(`build relation container failed, param "relation" is required.`)
        }
    }
}