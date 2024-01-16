import { useEffect, useState } from "react";

export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
}
