import Link from "next/link";

const ListLayout = (props) => (
  <>
    <div className="header">
      <Link href={`/list/${props.id}`}>View</Link>
      <Link href={`/list/${props.id}/edit`}>Edit</Link>
      <Link href={`/list/${props.id}/settings`}>Settings</Link>
    </div>
    {props.children}
  </>
);

export default ListLayout;
