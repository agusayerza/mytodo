import { Col, Row } from "react-bootstrap";
import { Oval } from "react-loader-spinner";


export function withLoader(isLoading: boolean, elem: JSX.Element) {
    return isLoading ? loader : elem;
}

const loader =
    <Row md={"12"} className="justify-content-md-center">
        <Col md="auto">
            <Oval arialLabel="loading-indicator" color="#222"/>
        </Col>
    </Row>