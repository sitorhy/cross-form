import type HubPublisher from "../core/HubPublisher";

declare module 'vue/types/vue' {
    interface Vue {
        $publisher: HubPublisher,
        _uid: number
    }
}
