import type {Relation} from "@/components/core/Document";
import type Collector from "@/components/core/Collector";
import type {Description} from "@/components/core/Document";

export default class VueRelation implements Relation {

    private _description: Description;

    constructor(description: Description) {
        this._description = description;
    }

    collect(collectors: Collector[]): Record<any, any> {
        return [];
    }

    select(collectors: Collector[]): Collector[] {
        return [];
    }
}