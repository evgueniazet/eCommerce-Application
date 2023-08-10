import React from 'react';
import { Link } from '../../components/Link/Link';

export const HomePage: React.FC = () => {
  return (
    <div>
      Home Page
      <Link navTo={`${window.location.origin}/login`}>Login</Link>
      <Link navTo={`${window.location.origin}/registration`}>Registration</Link>
    </div>
  );
};
