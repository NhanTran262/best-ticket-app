import {Button, Input} from "@material-tailwind/react";

export default function OrganizerInformation() {
    return (
        <div className="w-[40vh] ">
            <div>
                <h1>Thông tin nhà tổ chức sự kiện</h1>
            </div>
            <div>
                <div className="w-72 p-5">
                    <Input label="Nhà tổ chức"/>
                </div>
                <div>
                    <h2>Thông tin liên lạc</h2>
                    <div>
                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="email"
                                label="Email Address"
                                value={email}
                                onChange={onChange}
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-0",
                                }}
                            />
                            <Button
                                size="sm"
                                color={email ? "gray" : "blue-gray"}
                                disabled={!email}
                                className="!absolute right-1 top-1 rounded"
                            >
                                Invite
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
