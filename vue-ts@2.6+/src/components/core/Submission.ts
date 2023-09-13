import type {Rule, ValidateError} from "../core/Validator";
import type {Description} from "@/components/core/Document";

export default interface Submission {
    // 随机标识，必须实现
    id: string;

    // 窗口标识，选择实现，不确保有效性
    window?: string;

    // 关系描述，需要聚集数据时实现
    description?: Description;

    // 关系成员标识，非读写协议可以不实现
    member?: string | null;

    // 成员值，一般与成员字段组合出现，只读和非读写协议可以不实现
    value?: any;

    // 验证规则，按情况选择实现，默认接口按 async-validator 标准设计
    rules?: Rule;

    // 校验错误信息，按情况选择实现
    errors?: ValidateError[];
}
