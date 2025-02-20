import { Articles } from '../../../types/index';
import { isValueInstanceOf } from '../../../utils/isValueInstanceOf';
import './news.css';

class News {
    draw(data: Articles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true);

            if (!isValueInstanceOf(newsClone, HTMLElement)) {
                return;
            }

            const photo = newsClone.querySelector('.news__meta-photo');

            if (!isValueInstanceOf(photo, HTMLDivElement)) {
                return;
            }

            const author = newsClone.querySelector('.news__meta-author');

            if (!isValueInstanceOf(author, HTMLCollection)) {
                return;
            }

            const metaDate = newsClone.querySelector('.news__meta-date');

            if (!isValueInstanceOf(metaDate, HTMLCollection)) {
                return;
            }

            const title = newsClone.querySelector('.news__description-title');

            if (!isValueInstanceOf(title, HTMLTitleElement)) {
                return;
            }

            const source = newsClone.querySelector('.news__description-source');

            if (!isValueInstanceOf(source, HTMLTitleElement)) {
                return;
            }

            const content = newsClone.querySelector('.news__description-content');

            if (!isValueInstanceOf(content, HTMLParagraphElement)) {
                return;
            }

            const link = newsClone.querySelector('.news__read-more a');

            if (!isValueInstanceOf(link, HTMLParagraphElement)) {
                return;
            }

            if (idx % 2) {
                newsClone.querySelector('.news__item')?.classList.add('alt');
            }

            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            author.textContent = item.author || item.source.name;
            metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            content.textContent = item.description;
            link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock = document.querySelector('.news');

        if (!isValueInstanceOf(newsBlock, HTMLDivElement)) {
            return;
        }

        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
