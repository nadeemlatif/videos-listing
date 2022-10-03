interface Meta {
    title: string,
    description: string,
    uri: string,
    url: string,
    image: string
}

export default interface Moment {
    id: string;
    appId: string,
    muuid: string,
    tuuid: string,
    mediaType: string,
    source: string,
    slug: string,
    visitCount: number,
    tags: string,
    isFeatured: boolean,
    title: string;
    status: string;
    path: string,
    metaDetails: Meta,
    thumbnail: string,
    createdAt: string;
}
