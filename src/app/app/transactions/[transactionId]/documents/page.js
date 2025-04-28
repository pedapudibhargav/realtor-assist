import { Button, Card, CardBody } from "react-bootstrap";

export default function DocumentsPage() {
    return <>
        <Card className="bg-dark text-white">
            <CardBody>
                <h4>Documents</h4>
                <br />
                <div className='file-upload-container'>
                    <Button variant="primary" className='file-upload-button'>Upload File</Button>
                </div>
            </CardBody>
        </Card>
    </>;
}
