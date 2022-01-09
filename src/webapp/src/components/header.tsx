import { Navbar } from "react-bootstrap";

export interface IHeaderProps {}

function Header(props: IHeaderProps) {
    return (
    <Navbar variant={"dark"} bg={"dark"} id={"navBar"}>
        <Navbar.Brand href="/">MyTodo</Navbar.Brand>
    </Navbar>
    )
}
export default Header