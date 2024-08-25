import './App.css';
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import Carousel from './Components/Carousel';
import Navbar from './Components/Navbar';
import HeroPage from './Components/HeroPage';
import CreateAccount from './Components/CreateAccount';
import BookTable from './Components/BookTable';
import Menu from './Components/Menu';
import About from './Components/About';
import Testimonial from './Components/Testimonial';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Starters from './Components/Starters';
import MainFood from './Components/MainFood';
import Deserts from './Components/Deserts';
import AdminPanel from './Admin/AdminPanel';
import Gallery from './Components/Gallery';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import Logo from './Components/Logo';
import CartProvider from './Components/CartProvider';
import ItemProvider from './Components/ItemProvider';
import CategoryFilter from './Components/CategoryFilter';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Order from './Components/Order';
import Error from './Components/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute';
import ConfirmedOrder from './Components/ConfirmedOrder';
import FAQs from './Components/FAQs';
import TermsAndConditions from './Components/TermsAndConditions';

function App() {
  return (
    <div className="app">
      <ItemProvider>
        <Router>
          <ToastContainer/>
          <CartProvider>
            <Navbar />
          </CartProvider>
          <Routes>
            <Route path='/' element={<HeroPage />} />
            <Route path='/carousel' element={<Carousel />} />
            <Route path='/register' element={<CreateAccount />} />
            <Route path='/booktable' element={<BookTable />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/about' element={<About />} />
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/starters' element={<CategoryFilter category="Starters" />} />
            <Route path='/mainCourse' element={<CategoryFilter category="Main Course" />} />
            <Route path='/deserts&drinks' element={<CategoryFilter category="Deserts & Drinks" />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logo' element={<Logo />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/error' element={<Error />} />
            <Route path='/confirmedOrder' element={<ConfirmedOrder />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/terms' element={<TermsAndConditions />} />

            {/* route for admin panel */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
          </Routes>
          <Footer />
        </Router>
      </ItemProvider>
    </div>
  );
}

export default App;

