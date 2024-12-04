import {Modal} from "antd";

export default function RemoveModal({visible, onOk, onCancel}) {
    return (
        <Modal
            title="Xóa tài khoản"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Đồng ý"
            cancelText="Hủy"
        >
            <p>Bạn có chắc chắn muốn đóng tài khoản?
                Hành động sẽ khiến tài khoản của bạn bị xóa vĩnh viễn.</p>
        </Modal>
    )
}