interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <main className="w-full mx-auto max-w-7xl ">{children}</main>;
}

export default Container;
