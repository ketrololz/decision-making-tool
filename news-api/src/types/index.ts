export interface Everything {
    status: string;
    totalResults: number;
    articles: {
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
    }[];
}
