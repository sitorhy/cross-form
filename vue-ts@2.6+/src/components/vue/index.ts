import type _Vue from "vue";
import type {PluginObject} from "vue";

import HubPublisher from "@/components/vue/core/HubPublisher";

export interface CrossFormOptions {
    $publisher: HubPublisher;
}

class CrossForm implements PluginObject<CrossFormOptions> {
    installed: boolean = false;

    install(Vue: typeof _Vue, options?: CrossFormOptions) {
        if (this.installed) {
            return;
        }
        if (!Vue.prototype.$publisher) {
            Vue.prototype.$publisher = new HubPublisher();
        }
        this.installed = true;
    }
}

export default new CrossForm();
