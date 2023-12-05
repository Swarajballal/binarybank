import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { BrowserRouter as Router } from "react-router-dom";
import { userStateAtom } from './store/atoms/userStateAtom.ts'
import axios from 'axios'
import { ThemeProvider } from "@/components/ThemeProvider"


export function InitUser() {
  const setUser = useSetRecoilState(userStateAtom);

    const init = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/user/me`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
        });

        const data = await response.data;

        console.log(data);

        if(data.email) {
          setUser({
            isLoading: false,
            userEmail: data.email,
            userType: data.type,  
          });
        }else {
          console.log('no user found');
        }
      }catch(error) {
        console.error('Error:', error);
        console.log('no user found');
      }
    }

    useEffect(() => {
      init();
    },[setUser]);

  return null;

}

ReactDOM.createRoot(document.getElementById('root')!).render(
 
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RecoilRoot>
    <InitUser />
    <Router>
        <App />
    </Router>
  </RecoilRoot>
  </ThemeProvider>
)
