import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MianLayout from "./layouts/MianLayout";
import Dashboard from "./pages/Dashboard";
import AddCategories from "./pages/AddCategories";
import Orders from "./pages/Orders";
import ProductList from "./pages/PoductList";
import AddProduct from "./pages/AddProduct";
import Brands from "./pages/Brands";
import PageNotFound from "./pages/PageNotFound";
import Categories from "./pages/Categories";
import AddBrand from "./pages/AddBrand";
import EditCategory from "./pages/EditCategory";
import EditBrand from "./pages/EditBrand";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MianLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/addcategory" element={<AddCategories />} />
      <Route path="/editcategory/:id" element={<EditCategory />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/addbrand" element={<AddBrand />} />
      <Route path="/editbrand/:id" element={<EditBrand />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
