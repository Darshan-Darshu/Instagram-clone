import {
  getProviders,
  signIn as signInToProvider,
} from "next-auth/react";
import Header from "../../components/Header/Header";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center'>
        <img
          src='https://links.papareact.com/ocw'
          className='w-80'
          alt=''
        />
        <p className='font-xs italic'>
          This is Instagram Clone Build By{" "}
          <span className='font-semibold text-lg text-red-400'>
            Darshan Darshu
          </span>
        </p>
        <div className='mt-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='p-3 bg-blue-500 rounded-lg text-white'
                onClick={() =>
                  signInToProvider(provider.id, {
                    callbackUrl: "/",
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default signIn;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
