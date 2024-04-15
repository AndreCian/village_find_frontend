import { HttpService } from '@/services';
import React, { useEffect, useState } from 'react';

interface ICategory {
  _id: string;
  name: string;
}

interface ICategoryContext {
  isCategoryBar: boolean;
  toggleCategoryBar: () => void;
  categories: ICategory[];
}

export const CategoryContext = React.createContext<ICategoryContext>({
  isCategoryBar: false,
  toggleCategoryBar: () => {},
  categories: [],
});

interface ICategoryContextProps {
  children: React.ReactNode;
}

export function CategoryProvider({ children }: ICategoryContextProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    HttpService.get('/settings/general/category').then(response => {
      setCategories(response || []);
    });
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        isCategoryBar: isEnabled,
        toggleCategoryBar: () => setIsEnabled(!isEnabled),
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
