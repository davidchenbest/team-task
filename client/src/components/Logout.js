import React, { useEffect } from 'react';
import expireTime from '../modules/expireTime';
export default function Logout() {
  useEffect(() => {
    document.cookie = `taskjia=;${expireTime(0)}`;
    setTimeout(() => window.location.assign('/login'), 500);
  }, []);
  return <div>Logging Out</div>;
}
