import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const index = () => {
  const { query } = useRouter();
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    if (!query.tab) return;

    const Title = query.tab.toString().replace(/^\w/, (c) => c.toUpperCase());

    setTitle(Title);
  }, [query]);

  const handleSubmit = () => {
    const id = (document.getElementById('id-input') as any).value;

    submitRequest(id, (res) => {
      console.log(res);
    });
  };

  const submitRequest = async (id: string, callback: Function) => {
    if (id.length === 0) return;
    const res = await fetch(`/api/lookup?id=${id}`);
    callback(await res.json());
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='input-wrapper'>
        <div className='input-inner max-w-xl'>
          <input
            type='text'
            placeholder='User Id'
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
            spellCheck={false}
            autoFocus={true}
            id={'id-input'}
          ></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default index;
