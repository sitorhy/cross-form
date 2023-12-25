import type {Rule} from "../core/Validator";

import type {CreateElement, PropType, VNode, ComponentOptions} from "vue";

import Vue from "vue";
import Component from "vue-class-component";


// 只有一个子节点，默认该节点是输入控件，存在多个子组件时进行默认筛选
function getFirstComponent(slot: VNode[]): VNode | null | undefined {
    if (slot.length === 1) {
        return slot[0];
    } else {
        return slot.find(function (n) {
            if (n.componentOptions?.Ctor) {
                const extendOptions = (n.componentOptions.Ctor as { options?: ComponentOptions<Vue> })?.options;
                if (extendOptions) {
                    const propsOptions = extendOptions.props;
                    if (propsOptions) {
                        if (["autocomplete", "auto-complete", "autofocus", "placeholder"].some(p => Object.prototype.hasOwnProperty.call(propsOptions, p))) {
                            return true;
                        } else if (["value", "checked"].some(p => Object.prototype.hasOwnProperty.call(propsOptions, p))) {
                            return true;
                        } else if (["clearable", "min", "max", "precision", "editable", "multiple", "limit", "disabled", "data"].some(p => Object.prototype.hasOwnProperty.call(propsOptions, p))) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }
}

function hasPropDefinition(node: VNode, prop: string): boolean {
    if (node.componentOptions?.Ctor) {
        const extendOptions = (node.componentOptions.Ctor as { options?: ComponentOptions<Vue> })?.options;
        if (extendOptions && extendOptions.props) {
            return Object.prototype.hasOwnProperty.call(extendOptions.props, prop);
        }
    }
    return false;
}

function connect(context: CrossFormItem, vComponent: VNode): VNode {
    if (vComponent.componentOptions) {
        // 必要 检查是否定义了 value 属性
        if (hasPropDefinition(vComponent, context.valuePropName)) {
            if (!vComponent.componentOptions.propsData) {
                vComponent.componentOptions.propsData = {};
            }
            const propsData = (vComponent.componentOptions.propsData as { [key: string]: any });
            Object.assign(
                propsData,
                context.getValueProps(context.value)
            );
        }

        if (context.trigger) {
            if (!vComponent.componentOptions.listeners) {
                vComponent.componentOptions.listeners = {};
            }
            const triggerHandler = (vComponent.componentOptions.listeners as { [key: string]: Function })[context.trigger];
            if (triggerHandler !== context.onChange) {
                // 拦截或分发input事件响应，当组件已经绑定input响应时进行串行处理
                // v-model的input事件响应不执行，外部数据源的value将得不到更新，优先更新FormItem内部值实现间接绑定
                const newTriggerHandler = !triggerHandler ? context.onChange : (e: any) => {
                    context.onChange(e);
                    if (triggerHandler) {
                        triggerHandler(e);
                    }
                };
                Object.assign(
                    vComponent.componentOptions.listeners,
                    {
                        [context.trigger]: newTriggerHandler
                    }
                );
            }
        }
    }

    return vComponent;
}


const CrossFormItemProps = Vue.extend({
    props: {
        getValueFromEvent: {
            type: Function as PropType<(value: any) => any>,
            default: function (event: any): any {
                return event;
            }
        },
        // 传入value生成要注入的组件props
        getValueProps: {
            type: Function as PropType<(value: any) => any>,
            default: function (value: any): any {
                return {
                    [this.valuePropName]: value
                };
            }
        },
        valuePropName: {
            type: String,
            default: "value"
        },
        initialValue: {
            default: null
        },
        trigger: {
            type: String,
            default: "input"
        },
        name: {
            type: [String, Array],
            default: null
        },
        normalize: {
            type: Function as PropType<(value: any, prevValue: any, prevValues: Record<any, any>) => any>,
            default: null
        },
        preserve: {
            type: Boolean,
            default: true
        },
        rules: {
            type: Array as PropType<Rule[]>,
            default: null
        }
    }
});

@Component({
    name: "CrossFormItem",
    created() {

    }
})
export default class CrossFormItem extends CrossFormItemProps {
    value = this.initialValue;

    onChange(event: any): void {
        this.value = this.getValueFromEvent(event);
    }

    render(createElement: CreateElement): VNode | VNode[] | null | void {
        const slotRender = this.$scopedSlots.default;
        if (slotRender) {
            const props = Object.assign(
                {
                    value: this.value,
                    onChange: this.onChange
                }
            );
            const nodes = slotRender(props);
            if (Array.isArray(nodes) && nodes.length) {
                // 原则上只允许有一个子组件，当存在多个子组件时将自动识别可能的输入控件
                const inputComponent = getFirstComponent(nodes);
                if (inputComponent) {
                    // 存在输入组件，注入，否则放行
                    connect(this, inputComponent);
                }
                return nodes.length > 1 ? createElement("div", nodes) : nodes;
            }
        }

        return this.$slots.default;
    }
}
