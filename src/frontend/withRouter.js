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