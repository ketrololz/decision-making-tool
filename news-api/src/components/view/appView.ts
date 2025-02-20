import { Everything, Source } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news = new News();
    sources = new Sources();

    drawNews(data: Everything) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Source) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
