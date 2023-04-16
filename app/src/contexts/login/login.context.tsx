// import {
//     createContext, useState, useCallback,
//     useContext,
//     useEffect,
//   } from 'react';
// //   import { api } from '../services/api';
//   import {
//     ChildrenType, ProductsContextProps,
//     ProductsProps,
//   } from '../utils/types';

//   const ProductsContext = createContext({} as ProductsContextProps);

//   export function ProductsProvider({ children }: ChildrenType) {
//     const [products, setProducts] = useState<ProductsProps[]>([]);

//     const getProducts = useCallback(
//       (data: ProductsProps[]) => setProducts(data), [],
//     );

//     const getProductsData = useCallback(async () => {
//       const response = await api('products');
//       getProducts(response.data);
//     }, [getProducts]);

//     useEffect(() => {
//       getProductsData();
//     }, [getProductsData]);

//     return (
//       <ProductsContext.Provider value={{ products, getProducts }}>
//         {children}
//       </ProductsContext.Provider>
//     );
//   }

//   export const useProducts = () => useContext(ProductsContext);
export {};
