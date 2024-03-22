/* Components */
import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <Spinner size="lg" color="primary" />
    </main>
  );
}

export default Loading;
