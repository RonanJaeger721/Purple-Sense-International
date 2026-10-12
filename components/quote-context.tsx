"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
export type QuoteItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes: string;
};
type Context = {
  items: QuoteItem[];
  add: (item: Omit<QuoteItem, "id">) => void;
  update: (id: string, data: Partial<QuoteItem>) => void;
  remove: (id: string) => void;
  ready: boolean;
  notice: string;
};
const QuoteContext = createContext<Context | null>(null);
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("psi-quote-v1") || "[]");
      if (Array.isArray(saved))
        setItems(
          saved
            .filter(
              (x) =>
                typeof x.id === "string" &&
                typeof x.name === "string" &&
                x.name.trim() &&
                Number.isInteger(x.quantity) &&
                x.quantity > 0 &&
                x.quantity <= 999999 &&
                typeof x.unit === "string" &&
                typeof x.notes === "string",
            )
            .slice(0, 50),
        );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("psi-quote-v1", JSON.stringify(items));
      } catch {
        setNotice(
          "Your browser cannot save this basket. Keep this page open while preparing your request.",
        );
      }
  }, [items, ready]);
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(""), 4500);
      return () => clearTimeout(timer);
    }
  }, [notice]);
  const add = (item: Omit<QuoteItem, "id">) => {
    if (!ready) return;
    const canMerge = items.some(
      (x) =>
        x.name === item.name && x.unit === item.unit && x.notes === item.notes,
    );
    if (items.length >= 50 && !canMerge) {
      setNotice(
        "Your basket has 50 items. Please send this request before adding more.",
      );
      return;
    }
    const id = crypto.randomUUID();
    setItems((old) => {
      const existing = old.find(
        (x) =>
          x.name === item.name &&
          x.unit === item.unit &&
          x.notes === item.notes,
      );
      if (existing)
        return old.map((x) =>
          x.id === existing.id
            ? { ...x, quantity: Math.min(999999, x.quantity + item.quantity) }
            : x,
        );
      if (old.length >= 50) {
        return old;
      }
      return [...old, { ...item, id }];
    });
    setNotice(`${item.name} added to your quote`);
    window.dispatchEvent(
      new CustomEvent("psi:conversion", {
        detail: { event: "add_to_quote" },
      }),
    );
  };
  return (
    <QuoteContext.Provider
      value={{
        items,
        add,
        update: (id, data) =>
          setItems((old) =>
            old.map((x) => (x.id === id ? { ...x, ...data } : x)),
          ),
        remove: (id) => setItems((old) => old.filter((x) => x.id !== id)),
        ready,
        notice,
      }}
    >
      {children}
      <div className={`toast ${notice ? "show" : ""}`} role="status">
        {notice}
      </div>
    </QuoteContext.Provider>
  );
}
export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw Error("QuoteProvider missing");
  return value;
}
