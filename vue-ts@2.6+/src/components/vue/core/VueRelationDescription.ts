import type Vue from "vue";
import type {Description} from "@/components/core/Document";

/**
 * 传入 VueComponent 实例，自动填充 members 属性
 */
export default interface VueRelationDescription extends Description {
    component?: Vue;
}