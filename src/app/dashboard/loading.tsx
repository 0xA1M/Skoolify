/* Components */
import { Spinner } from "@nextui-org/react";

/* Custom Components */
import Provider from "@/components/UI/Provider";

function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export default Loading;
