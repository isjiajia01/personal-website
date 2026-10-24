export default function PageTemplate({ children }: { children: React.ReactNode }) {
  // Remounts on every navigation; `.stagger` replays the content rise (enter only, CSS-only, final state is visible).
  return <div className="stagger">{children}</div>;
}
