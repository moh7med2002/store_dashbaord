import './App.css';
import {ThemeProvider,createTheme} from '@mui/material'
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import AddDepartment from './pages/AddDepartment';
import Login from './pages/Login';
import {useSelector} from 'react-redux'
import AddCategory from './pages/AddCategory';
import Departments from './pages/Departments';
import Categories from './pages/Categories';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import UpdateProduct from './pages/UpdateProduct';
import Orders from './pages/Orders';
import SingleOrder from './pages/SingleOrder';
import Users from './pages/AllUser';
const theme = createTheme({
  palette:{
    primary:{
      main:"#ff5252",
      contrastText:"white"
    },
    Black:{
      main:"#24292d",
      contrastText:"white"
    }
  }
})

function App() {
  const {currentAdmin} = useSelector((state)=>state.admin)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="login" element={currentAdmin?<Navigate to="/"/>:<Login/>}/>
          <Route path="" element={currentAdmin?<Home/>:<Navigate to="/login"/>}/>
          <Route path="add-product" element={currentAdmin?<AddProduct/>:<Navigate to="/login"/>}/>
          <Route path="add-department" element={currentAdmin?<AddDepartment/>:<Navigate to="/login"/>}/>
          <Route path="add-category" element={currentAdmin?<AddCategory/>:<Navigate to="/login"/>}/>
          <Route path="departments" element={currentAdmin?<Departments/>:<Navigate to="/login"/>}/>
          <Route path="categories" element={currentAdmin?<Categories/>:<Navigate to="/login"/>}/>
          <Route path="products" element={currentAdmin?<Products/>:<Navigate to="/login"/>}/>
          <Route path="orders" element={currentAdmin?<Orders/>:<Navigate to="/login"/>}/>
          <Route path="orders/:orderId" element={currentAdmin?<SingleOrder/>:<Navigate to="/login"/>}/>
          <Route path="products/:productId" element={currentAdmin?<SingleProduct/>:<Navigate to="/login"/>}/>
          <Route path='product/update/:productId' element={currentAdmin?<UpdateProduct/>:<Navigate to="/login"/>}/>
          <Route path='users' element={currentAdmin?<Users/>:<Navigate to="/login"/>}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
