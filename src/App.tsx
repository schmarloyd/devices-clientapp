import { ViewProvider } from './contexts/View/ViewContext';
import { ItemProvider } from './contexts/Item/ItemContext';
import { MainContainer } from './views/MainContainer';

import './App.scss';

function App() {
  return (
    <ItemProvider>
      <ViewProvider>
        <MainContainer />
      </ViewProvider>
    </ItemProvider>
  );
}

export default App;
