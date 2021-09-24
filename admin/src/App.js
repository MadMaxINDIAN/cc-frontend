import { Provider } from 'react-redux';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import store from './store';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </Provider>
  );
}
