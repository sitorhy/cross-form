import type {Description} from "@/components/core/Document";

export default interface Collector {
    // 搜集器符合聚集条件
    fit(description: Description): boolean;

    // 标准化输入数据，建议转为基本类型
    write(input: any): any;

    // 解析基本类型，可传入非空的构造函数
    read(type?: Function): any;

    // 输入数据的合法检查和逻辑比较
    accept(input: any, value: any): boolean;
}