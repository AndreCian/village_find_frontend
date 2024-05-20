import { createContext, useState } from "react";

interface IProductContext {
    deliveryTypes: string[];
    setDeliveryTypes: (_: string[]) => void;
    nutrition: File | null;
    setNutrition: (_: File | null) => void;
    image: File | null;
    setImage: (_: File | null) => void;
}

export const ProductContext = createContext<IProductContext>({
    deliveryTypes: [],
    setDeliveryTypes: () => { },
    nutrition: null,
    setNutrition: () => { },
    image: null,
    setImage: () => { }
});

interface IProductProviderProps {
    children: React.ReactNode;
}

function ProductProvider({ children }: IProductProviderProps) {
    const [deliveryTypes, setDeliveryTypes] = useState<string[]>([]);
    const [nutrition, setNutrition] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);

    return <ProductContext.Provider value={{ deliveryTypes, setDeliveryTypes, nutrition, setNutrition, image, setImage }}>
        {children}
    </ProductContext.Provider>
}

export { ProductProvider };