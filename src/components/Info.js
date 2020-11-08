import React from 'react'
import { ModalHeader, ModalFooter, Modal, ModalBody, ModalButton, SIZE } from 'baseui/modal';
import { KIND as ButtonKind } from 'baseui/button';

function Info({ isOpen, setIsOpen }) {
    return (
        <div>
            <Modal
                onClose={() => setIsOpen(false)}
                closeable
                isOpen={isOpen}
                size={SIZE.default}
            >
                <ModalHeader>Hello world</ModalHeader>
                <ModalBody>
                    Proin ut dui sed metus pharetra hend rerit vel non mi.
                    Nulla ornare faucibus ex, non facilisis nisl. Maecenas
                    aliquet mauris ut tempus.
              </ModalBody>
                <ModalFooter>
                    <ModalButton kind={ButtonKind.tertiary}>
                        Cancel
                </ModalButton>
                    <ModalButton>Okay</ModalButton>
                </ModalFooter>
            </Modal>
        </div >
    )
}


export default Info
