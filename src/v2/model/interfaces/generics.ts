export declare type BaseResourceType = {
    id: string;
    name: string;
};

export declare type FilterType = {
    search?: string;
};

export interface SimpleResourceInterface<T extends BaseResourceType, U extends FilterType> {
    getAll(f?: U): Promise<Array<T>>;
    get(id: string): Promise<T>;
    set(a: T): Promise<T>;
    delete(id: string): Promise<void>;
}
