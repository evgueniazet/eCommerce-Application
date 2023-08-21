import React from 'react';
import { useAppSelector } from '../../store/hooks';

export const HomePage: React.FC = () => {
  const { email } = useAppSelector((state) => state.user);
  return (
    <div>
      Home Page <p>Hello, {email ? email : 'Stranger. Can I call you a Friend?'}</p>
    </div>
  );
};
