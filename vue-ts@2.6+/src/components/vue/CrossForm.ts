import type {CreateElement, VNode} from "vue";

import Vue from "vue";
import Component from "vue-class-component";

const CrossFormProps = Vue.extend({
    props: {
        name: {
            type: String,
            default: ""
        }
    }
});

@Component({
    name: "CrossForm"
})
export default class CrossFormItem extends CrossFormProps {
    render(createElement: CreateElement): VNode | VNode[] | null | void {
        if (this.$slots.default) {
            return this.$slots.default.length > 1 ? createElement("div", [
                this.$slots.default
            ]) : this.$slots.default[0]
        }
        return null;
    }
}
