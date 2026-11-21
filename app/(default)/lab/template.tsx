export default function NotesTemplate({ children }: { children: React.ReactNode }) {
  // Same entrance as the [lang] pages: replays the content rise on every navigation.
  return <div className="stagger">{children}</div>;
}
