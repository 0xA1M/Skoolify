/* Components */
import { Spinner } from "@nextui-org/react";

/* Custom Components */
import Provider from "@/components/UI/Provider";

function Loading() {
  return (
    <Provider>
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <Spinner size="lg" color="primary" />
      </main>
    </Provider>
  );
}

export default Loading;
