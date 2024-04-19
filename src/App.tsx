import Editor from './components/Editor';
import { Header } from './components/Header';

export default function App() {
    return (
        <main className='flex flex-col h-full'>
            <Header />
            <Editor />
        </main>
    );
}
