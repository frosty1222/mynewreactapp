import { Routes,Route} from 'react-router-dom';
import IndexComponent from './Components/IndexComponent';
import AddComponent from './Components/AddComponent';
import EditComponent from './Components/EditComponent';
import ShowComponent from './Components/ShowComponent';
// catering route
import IndexCaterComponent from './Components/Catering/IndexCaterComponent';
import AddCaterComponent from './Components/Catering/AddCaterComponent';
import EditCaterComponent from './Components/Catering/EditCaterComponent';
import ShowCaterComponent from './Components/Catering/ShowCaterComponent';
import CaterTableComponent from './Components/Catering/CaterTableComponent';
// beverage routes
import BIndexComponent from './Components/beverage/BIndexComponent';
import BAddComponent from './Components/beverage/BAddComponent';
import BEditComponent from './Components/beverage/BEditComponent';
// login and register routes
import LoginComponent from './Components/user/LoginComponent';
import RegisterComponent from './Components/user/RegisterComponent';
//page not found routes
import PageNotFound from './Components/PageNotFound';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutesAdmin from './ProtectedRoutesAdmin';
// testcomponent
import TestComponent from './Components/TestComponent';
// cartComponent
import CartComponent from './Components/cart/CartComponent';
import PayMentComponent from './Components/cart/PayMentComponent';
// admin routes
import CounponComponent from './Components/admin/CouponComponent';
export default function RouteClass(){
       return (
         <>
          <Routes>
                <Route element={<ProtectedRoutes/>}>
                   <Route index element={ <IndexComponent/>} />
                   <Route path="/cart" element={<CartComponent/>}/>
                   <Route path="/payment/:id" element={<PayMentComponent/>}/>
                </Route>
                <Route element={<ProtectedRoutesAdmin/>}>
                     {/* admin routes */}
                   <Route path="/makecoupon" element={<CounponComponent/>} />
                </Route>
                {/* <ProtectedRoute index element={ <IndexComponent/>}/> */}
                <Route path="/addnew" element={ <AddComponent/>} />
                <Route path="/editItem/:id" element={ <EditComponent/>} />
                <Route path="/showItem/:id" element={ <ShowComponent/>} />
                <Route path="/login" element={ <LoginComponent/>} />
                <Route path="/register" element={ <RegisterComponent/>} />
                {/* catering route */}
                <Route path="/indexcater" element={<IndexCaterComponent/>}/>
                <Route path="/addcater" element={<AddCaterComponent/>}/>
                <Route path="/editcater/:id" element={<EditCaterComponent/>}/>
                <Route path="/showcater/:id" element={<ShowCaterComponent/>}/>
                <Route path="/catertable" element={<CaterTableComponent/>}/>
                {/* beverage routes */}
                <Route path="/bindex" element={<BIndexComponent/>}/>
                <Route path="/badd" element={<BAddComponent/>}/>
                <Route path="/bedit/:id" element={<BEditComponent/>}/>
                {/* page not found routes */}
                <Route path="*" element={<PageNotFound/>}/>
                {/* test routes */}
                <Route path="/test" element={<TestComponent/>}/>
                {/* cart routes */}
          </Routes>
         </>
       )
}
