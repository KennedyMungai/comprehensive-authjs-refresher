type Props = {
  searchParams: {
    token?: string;
  };
};

const PasswordResetPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return <div>{token}</div>;
};

export default PasswordResetPage;
