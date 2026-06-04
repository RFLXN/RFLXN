export function Footer({ left, right }: { left: string; right: string }) {
  return (
    <footer className="footer-note">
      <span>{left}</span>
      <span>{right}</span>
    </footer>
  );
}
