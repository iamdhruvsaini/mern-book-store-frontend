import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './routes/routes'
import store from './redux/store/store'
import { Provider } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
