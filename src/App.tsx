import { useRoutes } from 'react-router-dom';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import styled from 'styled-components';

import { routes as appRoutes } from '@/routes';

import { AuthProvider, CategoryProvider, SearchbarProvider } from '@/providers';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    color: 'white',
  },
  '&.notistack-MuiContent-error': {
    color: 'white',
  },
}));

function App() {
  const routes = useRoutes(appRoutes);

  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <SearchbarProvider>{routes}</SearchbarProvider>
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
