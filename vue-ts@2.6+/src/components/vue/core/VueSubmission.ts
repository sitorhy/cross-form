import {v4 as uuid} from "uuid";
import type {Rule, ValidateError} from "@/components/core/Validator";
import type Submission from "@/components/core/Submission";

export default class VueSubmission implements Submission {
    errors?: ValidateError[];
    relation: string | null;
    id: string;
    member?: string | Array<string | number> | null;
    rules?: Rule;
    value: any;
    window?: string;

    constructor(relation: string | number | null = null, member: string | number | null = null) {
        this.id = uuid();
        this.relation = relation ? relation.toString() : null;
        this.member = member ? member.toString() : null;
    }
}