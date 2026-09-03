import Sidebar from './Sidebar';
export default function Layout({children}:{children:React.ReactNode}) { return <div className="app-shell"><Sidebar/><main className="main">{children}</main></div>; }
