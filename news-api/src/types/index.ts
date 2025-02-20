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
