import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const redirect = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/discord', null, { shallow: false });
  }, []);

  return null;
};

export default redirect;
