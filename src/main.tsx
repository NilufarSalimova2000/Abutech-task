import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from './config/query-client.ts';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <QueryClientProvider client={client}>
      <ConfigProvider theme={{ token: { colorPrimary: "#0eb182" } }}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
