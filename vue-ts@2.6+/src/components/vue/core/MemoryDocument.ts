import type Collector from "@/components/core/Collector";
import type {Description, Document, Relation} from "@/components/core/Document";

import VueRelation from "@/components/vue/core/VueRelation";

export default class MemoryDocument implements Document {
    private _relations: Map<string, VueRelation> = new Map();
    private _collectors: Map<string, Collector> = new Map();

    build(description: Description): Relation {
        let relation: VueRelation = new VueRelation({
            classifications: description.classifications,
            members: description.members,
            id: description.id
        });
        this._relations.set(description.id, relation);
        return relation;
    }

    contain(description: Description): boolean {
        return this._relations.has(description.id);
    }

    query(description: Description): Relation | null {
        const relation: VueRelation | undefined = this._relations.get(description.id);
        return relation ? relation : null;
    }

    register(member: string, collector: Collector): void {
        this._collectors.set(member, collector);
    }

    access(member: string): Collector | null | undefined {
        return this._collectors.get(member);
    }

    deregister(member: string): boolean {
        return this._collectors.delete(member);
    }
}