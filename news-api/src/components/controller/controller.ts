import { Everything, Source } from '../../types/index';
import { isValueInstanceOf } from '../../utils/isValueInstanceOf';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data?: Source) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: Everything) => void) {
        let target = e.target;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (!isValueInstanceOf(target, HTMLElement)) {
                return;
            }

            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId === null) {
                    return;
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
