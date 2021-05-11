interface SignInResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

function signIn(): Promise<SignInResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'syhgd8syhd8a9ywdsadu8ydhssdd',
        user: {
          name: 'Roberto',
          email: 'robertofortes23@gmail.com',
        },
      });
    }, 2000);
  });
}

const authService = {
  signIn,
};

export default authService;
