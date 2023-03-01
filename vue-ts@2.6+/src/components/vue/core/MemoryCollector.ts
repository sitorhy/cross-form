import type Collector from "@/components/core/Collector";
import type {Description} from "@/components/core/Document";

export default class MemoryCollector implements Collector {
    private readonly _classifications: string[] = [];

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