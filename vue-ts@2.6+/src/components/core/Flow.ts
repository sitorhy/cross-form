// 订阅协议
export interface Subscription {
    // 背压、协议实现
    request(): void;

    // 取消订阅，一般需要传入发布器引用
    cancel(): void;
}

// 订阅者标准接口
export interface Subscriber<T, S extends Subscription> {
    // Publisher在被指定一个新的Subscriber时调用此方法
    onSubscribe(subscription: S): void;

    // 每当新的数据产生，这个方法会被调用
    onNext(item: T): void;

    // Publisher出现异常时会调用subscriber的这个方法，js抛异常能指定任意类型，此处不做限制
    onError(error: unknown): void;

    // Publisher数据推送完毕时会调用此方法
    onComplete(): void;
}

// 发布者标准接口
export interface Publisher<T, K extends Subscription, S extends Subscriber<T, K>> {
    subscribe(subscriber: S): void;
}
