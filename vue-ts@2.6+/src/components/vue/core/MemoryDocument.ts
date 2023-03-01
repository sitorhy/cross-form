import type {Description, Document, Relation} from "@/components/core/Document";
import VueRelation from "@/components/vue/core/VueRelation";

export default class MemoryDocument implements Document {
    draft(description: Description): Relation {
        return new VueRelation(description);
    }

}