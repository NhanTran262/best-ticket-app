import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {IoClose} from "react-icons/io5";
import {useFormatDate} from "../ultility/customHook/useFormatDate.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ModalEditBookings(props) {
    const [open, setOpen] = useState(props.dataFromParent);
    const booking = props.booking;
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setOpen(props.dataFromParent)
    }, [props]);
    const sendData = (data) => {
        props.parentCallback(data);
    };
    useEffect(() => {
        sendData(open)
    }, [open]);

    const handleEditForm = () => {
        if (edit) {
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setOpen(false)
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel
                                className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div
                                    className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <IoClose className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    <div
                                        className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">

                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                                Booking
                                            </h2>
                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Booking information
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-2xl text-gray-900">
                                                        Create At
                                                    </p>
                                                    <p className="text-2xl text-gray-900">
                                                        {useFormatDate(booking.createdAt)}
                                                    </p>
                                                </div>
                                            </section>
                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>
                                                <form>
                                                    <div className="flex  items-center justify-between">
                                                        <label htmlFor="status"
                                                               className="text-sm font-medium text-gray-900">Status</label>
                                                        <input id="status" type={"text"} value={booking.status}
                                                               className={classNames(
                                                                   !edit ? "input input-sm input-disabled text-sm font-medium text-indigo-600 "
                                                                       : "hidden"
                                                               )}/>
                                                        <input id="status" type={"text"} placeholder={booking.status}
                                                               className={classNames(
                                                                   !edit ? "hidden"
                                                                       : "input input-sm input-info text-sm font-medium text-indigo-600 hover:text-indigo-100 "
                                                               )}/>
                                                        <input type="button" className="btn" value={edit?"Cancel" : "Edit"}
                                                                onClick={handleEditForm}>
                                                        </input>


                                                    </div>
                                                    <div className="mt-10">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium text-gray-900">Customer</h4>
                                                            <span
                                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-100 cursor-pointer">
                                                                {booking.customerName}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Add to bag
                                                    </button>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
