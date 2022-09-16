import * as C from './components/MainComponents';
import { Header } from './components/partials/Header';
import { Footer } from './components/partials/Footer';
import { Routes } from './routes/Routes';

function App() {
  return (
    <C.Template>
      <Header />
        <Routes />
      <Footer />
    </C.Template>
  );
}

export default App;
