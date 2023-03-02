import type Collector from "@/components/core/Collector";

export interface Relation {
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

    /**
     * 分类，二级标识，可选
     */
    classifications?: string[];
}

export interface Document {
    /**
     * 根据描述对象创建关系容器
     * @param description
     */
    draft(description: Description): Relation;

    /**
     * 是否存在符合描述的容器
     * @param description
     */
    contain(description: Description): boolean;

    /**
     * 根据符合描述的关系容器
     * @param description
     */
    query(description: Description): Relation | null;
}