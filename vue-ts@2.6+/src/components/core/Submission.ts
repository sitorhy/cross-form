import type {Rule, ValidateError} from "../core/Validator";

export default interface Submission {
    // 随机标识
    id: string;

    // 窗口标识，选填，不确保有效性
    window?: string;

    // 表单标识，必填
    form: string | null;

    // 字段标识，必填
    name: string | Array<string | number> | null;

    // 数据源值，主动事件可忽略改字段
    value?: any;

    // 验证规则
    rules?: Rule;

    // 校验错误信息
    errors?: ValidateError[];
}
