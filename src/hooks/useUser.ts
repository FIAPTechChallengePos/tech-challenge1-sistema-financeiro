import { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
};

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule fetch de dados (substitua por fetch real ou API)
    setLoading(true);
    setTimeout(() => {
      setUser({ id: userId, name: "Carina" });
      setLoading(false);
    }, 500);
  }, [userId]);

  return { user, loading };
} 