import React from 'react';
import { ILink } from '../interfaces/ILink';

export const Link = ({ children, className, navTo }: ILink) => {
  const redirectTo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', navTo);
    const popstateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popstateEvent);
  };

  return (
    <a className={className} onClick={redirectTo} href={navTo}>
      {children}
    </a>
  );
};
