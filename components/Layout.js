import Header from "./Header";
import NavBar from "./NavBar";

const Layout = (props) => (
  <div className="layout">
    <Header />
    <div className="content">{props.children}</div>
    <NavBar />
  </div>
);

export default Layout;
