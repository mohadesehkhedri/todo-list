import React from "react";
import './App.scss';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

import TodoApp from "./components/Todo";
import theme from "./theme"

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>

        <TodoApp />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App;
