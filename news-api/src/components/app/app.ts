import { Everything, Source } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller = new AppController();
    view = new AppView();

    start() {
        document.querySelector('.sources')?.addEventListener('click', (e) => {
            this.controller.getNews(e, (data: Everything) => this.view.drawNews(data));
        });
        this.controller.getSources((data: Source) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
