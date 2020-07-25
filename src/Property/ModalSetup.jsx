import React from 'react';
import PropertyDetails from './propertydetails'
import './modal.css';
import Modal from 'react-bootstrap/Modal'

const modal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="example-modal-sizes-title-xl"
            centered
            dialogClassName="modal-95w"
        >
            <Modal.Header style={{ color: '#995fc5' }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.show &&
                    <PropertyDetails propertyDetails={props.propertyDetails} />
                }
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button style={{ backgroundColor: '#995fc5', color: '#fff' }} onClick={props.close}>Close</button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}

export default modal;