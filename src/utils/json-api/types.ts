type ResourceObjectOrObjects = ResourceObject | ResourceObject[]

export type ResourceIdentifier<T extends ResourceObject = ResourceObject> = Pick<T, 'type' | 'id'>

interface Attributes {
    [index: string]: string | number | boolean | Array<Attributes> | undefined | null
}

interface Relationships {
    [index: string]: Relationship
}

export interface Relationship<T extends ResourceObject | ResourceObject[] = ResourceObject | ResourceObject[]> {
    data: T extends ResourceObject
        ? ResourceIdentifier<T> | null
        : T extends ResourceObject[]
        ? ResourceIdentifier<T[0]>[]
        : ResourceIdentifier | ResourceIdentifier[]
}

export interface ResourceObject {
    type: string
    id: string
    attributes?: Attributes
    relationships?: Relationships
}

export interface Response<
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects,
    Included extends ResourceObjectOrObjects = ResourceObjectOrObjects
> {
    data: Data
    meta: {
        count: number
        total_count: number
        total_pages: number
        filters?: {
            option_types: []
            product_properties: []
        }
    }
    included: Included
}
