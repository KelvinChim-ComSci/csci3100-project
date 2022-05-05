/**************************************************************************************** 
This component is activated when the system is required to route to different pages

Last updated: 5/5/2022 by Wong Yi Oi
****************************************************************************************/

import { useParams, useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        navigate={navigate}
        {...props}
        params={params}
      />
    );
  };

  return Wrapper;
};