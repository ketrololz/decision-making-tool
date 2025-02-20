export interface Everything {
    status: string;
    totalResults: number;
    articles: Articles[];
}

export interface Articles {
    source: {
        id: null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Source {
    status: string;
    sources: SourceItem[];
}

export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
