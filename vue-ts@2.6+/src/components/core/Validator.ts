export declare type Value = any;
export declare type Values = Record<string, Value>;

export interface ValidateError {
    message?: string;
    fieldValue?: Value;
    field?: string;
}

export interface ValidateOption {
    first?: boolean;
    firstFields?: boolean | string[];
}

export declare type ValidateFieldsError = Record<string, ValidateError[]>;

// 校验回调，errors 所有错误数组，fields 错误数组 reduce 分组后的结果
export declare type ValidateCallback = (errors: ValidateError[] | null, fields: ValidateFieldsError | Values) => void;

export interface Validator {
    validate(source: Values, option?: ValidateOption, callback?: ValidateCallback): Promise<Values>;

    validate(source: Values, callback: ValidateCallback): Promise<Values>;

    validate(source: Values): Promise<Values>;
}

export declare type SyncErrorType = Error | string;
export declare type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];
export declare type RuleType =
    'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'pattern'
    | 'any';
export declare type ExecuteValidator = (rule: InternalRuleItem, value: Value, callback: (error?: string[]) => void, source: Values, options: ValidateOption) => void;

export interface InternalRuleItem extends Omit<RuleItem, 'validator'> {
    field?: string;
    fullField?: string;
    fullFields?: string[];
    validator?: RuleItem['validator'] | ExecuteValidator;
}

export declare type Rule = RuleItem | RuleItem[];

export interface RuleItem {
    type?: RuleType;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    len?: number;
    enum?: Array<string | number | boolean | null | undefined>;
    whitespace?: boolean;
    options?: ValidateOption;
    message?: string | ((a?: string) => string);
    asyncValidator?: (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => void | Promise<void>;
    validator?: (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => SyncValidateResult | void;
}

export declare type Rules = Record<string, Rule>;
