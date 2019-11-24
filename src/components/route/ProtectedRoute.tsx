import {
  Route
} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
  
  return (
    <Route {...rest} render={(props) => (
      
    )} />
  );
}


export default ProtectedRoute;