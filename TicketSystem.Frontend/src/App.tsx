import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TwoFactorAuthentication from './components/TwoFactorAuthentication/TwoFactorAuthentication';
import Home from './components/Home/Home';
import { AuthenticationForm } from './components/AuthenticationForm/AuthenticationForm';


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationForm />} />
          <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
