import {Modal} from "antd";


export default function LockModal({visible, onOk, onCancel}) {
    return (
        <Modal
            title="Đóng tài khoản"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Đồng ý"
            cancelText="Hủy"
        >
            <p>Bạn có chắc chắn muốn đóng tài khoản?
                Hành động sẽ khiến tài khoản của bạn bị vô hiệu hóa cho đến khi bạn mở lại!</p>
        </Modal>
    );
}