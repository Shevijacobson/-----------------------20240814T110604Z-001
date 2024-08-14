import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Rout from './componets/routes';
import Header from './componets/header';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  useEffect(() => {
    if (user.Name != null) {
      navigate("/homepage")
    }
  }, [user])

  return (
    <div>
      <Header />
      <Rout />
    
    </div>

  );
}

export default App;
