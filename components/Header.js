import Link from "next/link";

const Header = () => (
  <div className="header">
    <Link href="/">
      <span className="brand">Clipboard Helper</span>
    </Link>
    <Link href="/list">Lists</Link>
    <Link href="/settings">Settings</Link>
  </div>
);

export default Header;
