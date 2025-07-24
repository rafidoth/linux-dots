import { Toaster } from "@/components/ui/sonner";

function SonnerWrapper({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export default SonnerWrapper;
