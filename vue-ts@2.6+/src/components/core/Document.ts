import type Collector from "@/components/core/Collector";

export interface Relation {
    /**
     * 关系的唯一标识
     */
    get id(): string;

    /**
     * 筛选出复合条件的搜集器
     * @param collectors
     */
    select(collectors: Collector[]): Collector[];

    /**
     * 聚集搜集器数据为一个 object 类型，定义为 Record 类型，绕过 key exist 检查
     * @param collectors
     */
    collect(collectors: Collector[]): Record<any, any>;
}

export interface Description {

    /**
     * 关系描述，关系标识是必须的
     */
    id: string;
}

export interface Document {
    draft(description: Description): Relation;
}