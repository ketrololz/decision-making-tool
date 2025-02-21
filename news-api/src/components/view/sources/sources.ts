import { SourceItem } from '../../../types/index';
import { isValueInstanceOf } from '../../../utils/isValueInstanceOf';
import './sources.css';

class Sources {
    draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true);

            if (!isValueInstanceOf(sourceClone, DocumentFragment)) {
                return;
            }

            const itemName = sourceClone.querySelector('.source__item-name');
            const itemElem = sourceClone.querySelector('.source__item');

            if (!(isValueInstanceOf(itemName, HTMLElement) && isValueInstanceOf(itemElem, HTMLElement))) {
                return;
            }

            itemName.textContent = item.name;
            itemElem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesElem = document.querySelector('.sources');

        if (!isValueInstanceOf(sourcesElem, HTMLDivElement)) {
            return;
        }

        sourcesElem.append(fragment);
    }
}

export default Sources;
