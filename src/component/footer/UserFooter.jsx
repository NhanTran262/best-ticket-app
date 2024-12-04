import React from "react";
import img from "../../assets/img/logo/logo-auth-header-light.svg"
import imgFooter from "../../assets/img/footer/logo-footer.jpg"

function UserFooter(props) {
    return (
        <>
            <div className="bg-gray-200 pt-10 pb-32">
                <div className="flex mx-10 gap-10">
                    <div className="w-2/5 flex">
                        <div className="w-1/5 mr-4">
                            <img
                                className="w-32 h-32"
                                src={img}
                                alt=""
                            />
                        </div>
                        <p className="w-4/5 m-auto">
                            <p>
                                Hệ thống quản lý và phân phối vé sự kiện hàng đầu
                                Việt Nam
                                <br/>
                                BestTicket Co. Ltd. © 2023
                            </p>
                        </p>
                    </div>
                    <div className="w-3/5 flex items-center">
                        <div>
                            <p>Công ty TNHH BestTicket</p>
                            <p>
                                Đại diện theo pháp luật: Trần Ngọc Thái Sơn
                            </p>
                            <p>Địa chỉ: Tầng 3, 21K Nguyễn Văn Trỗi , Phường 12, Quận Phú Nhuận,TP.Hồ Chí Minh</p>
                            <p>

                                Hotline: 1900.6408 - Email: support@bestticket.vn
                            </p>
                            <p>Giấy chứng nhận đăng ký doanh nghiệp số: 0313605444, cấp lần đầu ngày 07/01/2023 bởi Sở
                                Kế
                                Hoạch
                                và Đầu Tư TP. Hồ Chí Minh</p>
                        </div>
                        <div>
                            <img src={imgFooter} alt=""/>
                        </div>


                    </div>
                </div>
                <footer className="flex font text-xs py-10 px-4">
                    <div className="ft-left w-1/3 ">
                        <h4 className="font-bold text-[#c9c9c9]">
                            Ứng dụng BestTicket
                        </h4>
                        <div className="my-3">
                            <img
                                className="h-14 w-40"
                                src="/src/assets/img/footer/google_play.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="h-14 w-40"
                                src="/src/assets/img/footer/app_store.png"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="ft-center w-1/3 ">
                        <h4 className="font-bold text-[#c9c9c9]">
                            Ứng dụng check-in cho Ban tổ chức
                        </h4>

                        <div className="my-3">
                            <img
                                className="h-14 w-40"
                                src="/src/assets/img/footer/mobile.png"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="ft-right w-1/3 ">
                        <h4 className="font-bold text-[#c9c9c9]">Follow us</h4>

                        <div className="my-3">
                            <img
                                className="inline-block mr-2"
                                src="/src/assets/img/footer/facebook.svg"
                                alt=""
                            />
                            <img
                                className="inline-block"
                                src="/src/assets/img/footer/instagram.svg"
                                alt=""
                            />
                        </div>

                        <h4 className="font-bold text-[#c9c9c9]">Ngôn ngữ</h4>
                        <div className="my-3">
                            <img
                                className="inline-block mr-2 w-10 h-10"
                                src="/src/assets/img/footer/vietnam.svg"
                                alt=""
                            />
                            <img
                                className="inline-block w-11 h-8"
                                src="/src/assets/img/footer/english.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default UserFooter;
