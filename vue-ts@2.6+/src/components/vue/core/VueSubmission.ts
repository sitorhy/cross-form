import type {Rule, ValidateError} from "@/components/core/Validator";
import type Submission from "@/components/core/Submission";
import type {Description} from "@/components/core/Document";
import type VueRelationDescription from "@/components/vue/core/VueRelationDescription";

import {v4 as uuid} from "uuid";

export default class VueSubmission implements Submission {
    errors?: ValidateError[];

    description?: Description;

    id: string;

    member?: string | null;

    rules?: Rule;

    value: any;

    window?: string;

    extra: Record<any, any> | null | undefined;

    constructor(relation: string | number | null = null, member: string | number | null = null, description?: VueRelationDescription) {
        this.id = uuid();
        this.description = description;
        this.member = member ? member.toString() : null;
        this.extra = null;
    }
}