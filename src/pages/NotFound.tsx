import { Navigate } from "react-router-dom";

type Props = {};

export const GenericNotFound = () => <Navigate replace to="/404" />;

export const NotFound = (props: Props) => {
  return (
    <div>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
  );
};
