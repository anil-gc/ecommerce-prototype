import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';
import { HomePage } from '@/features/home/HomePage';
import { ShopPage } from '@/features/shop/ShopPage';
import { CategoryPage } from '@/features/shop/CategoryPage';
import { ProductDetailPage } from '@/features/product/ProductDetailPage';
import { CartPage } from '@/features/cart/CartPage';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import { OrderSuccessPage } from '@/features/checkout/OrderSuccessPage';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'category/:slug',
        element: <CategoryPage />,
      },
      {
        path: 'product/:slug',
        element: <ProductDetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'order-success',
        element: <OrderSuccessPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
