import { useLocation } from 'react-router-dom';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import styled from 'styled-components';

import Routes from '@/routes';
import {
  AuthProvider,
  CategoryProvider,
  SearchbarProvider,
  ZipcodeProvider,
} from '@/providers';
import { useEffect } from 'react';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    color: 'white',
  },
  '&.notistack-MuiContent-error': {
    color: 'white',
  },
}));

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const hash = location.hash;

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <SearchbarProvider>
            <ZipcodeProvider>
              <Routes />
            </ZipcodeProvider>
          </SearchbarProvider>
        </CategoryProvider>
      </AuthProvider>
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
        }}
      />
    </>
  );
}

export default App;
