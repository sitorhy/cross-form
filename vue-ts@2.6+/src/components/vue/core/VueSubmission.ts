import {v4 as uuid} from "uuid";
import type {Rule, ValidateError} from "@/components/core/Validator";
import type Submission from "@/components/core/Submission";

export default class VueSubmission implements Submission {
    errors?: ValidateError[];
    form: string | null;
    id: string;
    name: string | Array<string | number> | null;
    rules?: Rule;
    value: any;
    window?: string;

    constructor(form: string | number | null = null, name: string | number | null = null) {
        this.id = uuid();
        this.form = form ? form.toString() : null;
        this.name = name ? name.toString() : null;
    }
}