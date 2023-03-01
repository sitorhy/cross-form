import type {Description} from "@/components/core/Document";

export default class VueRelationDescription implements Description {
    private readonly _id: string;

    private readonly _classifications: string[] = [];

    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    get classifications(): string[] {
        return this._classifications;
    }
}