import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

export const Home = ()=> {

    return (
        <div className="container">
            <Sidebar />
            <Content />
        </div>
    );
};