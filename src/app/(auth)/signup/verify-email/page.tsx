type Props = {
  searchParams: {
    token: string;
  };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return <div>{token}</div>;
};

export default VerifyEmail;
