import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import MuiTheme from './MuiTheme';
import RootRoutes from './routes/RootRoutes';

function App() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <RootRoutes />
    </ThemeProvider>
  );
}

export default App;
