import type {Description, Document, Relation} from "@/components/core/Document";
import VueRelation from "@/components/vue/core/VueRelation";

export default class MemoryDocument implements Document {
    private _relations: Map<string, VueRelation> = new Map();

    draft(description: Description): Relation {
        let relation: VueRelation | undefined = this._relations.get(description.id);
        if (!relation) {
            relation = new VueRelation(description);
            this._relations.set(description.id, relation);
        }
        return relation;
    }

    contain(description: Description): boolean {
        return this._relations.has(description.id);
    }

    query(description: Description): Relation | null {
        const relation: VueRelation | undefined = this._relations.get(description.id);
        return relation ? relation : null;
    }
}