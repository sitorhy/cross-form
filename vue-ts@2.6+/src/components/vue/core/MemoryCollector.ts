import type Collector from "@/components/core/Collector";
import type {Description} from "@/components/core/Document";

export default class MemoryCollector implements Collector {
    private readonly _classifications: string[] = [];

    private readonly _id: string;

    constructor(id: string, classifications?: string[]) {
        this._id = id;
        if (classifications) {
            this._classifications = classifications;
        }
    }

    get classifications(): string[] {
        return this._classifications;
    }

    fit(description: Description): boolean {
        return this.classifications.some(i => description.classifications?.includes(i));
    }

    accept(input: any, value: any): boolean {
        return false;
    }

    read(type?: Function): any {
    }

    write(input: any): any {
    }
}