import HubProcessorSubscription from "@/components/vue/core/HubProcessorSubscription";

export default class BuildSubscription extends HubProcessorSubscription {
    request(): void {
        throw new Error("Method not implemented.");
    }

}