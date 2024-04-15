import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import styled from 'styled-components';

import Routes from '@/routes';

import { AuthProvider, CategoryProvider, SearchbarProvider, ZipcodeProvider } from '@/providers';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    color: 'white',
  },
  '&.notistack-MuiContent-error': {
    color: 'white',
  },
}));

function App() {
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
