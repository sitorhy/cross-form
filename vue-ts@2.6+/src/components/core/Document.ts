import type Collector from "@/components/core/Collector";

export interface Relation {
    collect(collectors: Collector[]): Collector[];
}

export interface Document {
    draft(relation: string): Relation;
}