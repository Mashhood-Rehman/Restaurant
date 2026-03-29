import React from 'react';
import { Icon } from '@iconify/react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUpdateUserByIDMutation } from '../features/api/userApi';
import { toast } from 'react-toastify';

const DriverStatusBanner = () => {
    const { currentUser } = useCurrentUser();
    const [updateUserByID, { isLoading }] = useUpdateUserByIDMutation();

    // Only show for riders who are offline
    if (!currentUser?.userData || currentUser.userData.role !== 'rider' || currentUser.userData.isOnline) {
        return null;
    }

    const handleGoOnline = async () => {
        try {
            await updateUserByID({
                id: currentUser.userData.id,
                data: { isOnline: true }
            }).unwrap();
            toast.success("Welcome Online! Drive safe.");
        } catch (error) {
            console.error("Failed to go online:", error);
            toast.error("Could not set status to Online");
        }
    };

    return (
        <div className="bg-red-600 text-white py-3 px-4 fixed top-16 left-0 w-full z-10 shadow-lg animate-bounce-subtle">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Icon icon="mdi:alert-circle" className="text-2xl" />
                    <p className="font-bold text-sm sm:text-base">
                        You are currently OFFLINE. You must be ONLINE to receive orders.
                    </p>
                </div>
                <button
                    onClick={handleGoOnline}
                    disabled={isLoading}
                    className="bg-white text-red-600 px-6 py-1.5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50"
                >
                    {isLoading ? "Going Online..." : "Go Online Now"}
                </button>
            </div>
        </div>
    );
};

export default DriverStatusBanner;
