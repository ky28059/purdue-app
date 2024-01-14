'use client'

import {useAuth, useUser} from 'reactfire';
import {signOut} from 'firebase/auth';

// Components
import SidebarItem from '@/app/SidebarItem';
import SignInButton from '@/components/SignInButton';
import FirebaseUserDataUpdater from '@/components/FirebaseUserDataUpdater';

// Icons
import {FaBookmark, FaCalendar, FaGear} from 'react-icons/fa6';


export default function Sidebar() {
    const auth = useAuth();
    const {data: user, status} = useUser();

    return (
        <aside className="fixed bottom-0 w-screen sm:w-[12rem] flex-none px-4 sm:pl-3 sm:pr-0 py-2 sm:pt-24 sm:pb-12 border-r border-tertiary dark:border-tertiary-dark flex gap-4 sm:gap-1 justify-center sm:justify-start sm:flex-col sm:sticky sm:top-0 sm:h-screen z-30 bg-content-secondary dark:bg-content-secondary-dark">
            <SidebarItem href="/" icon={FaCalendar}>
                Home
            </SidebarItem>
            <SidebarItem href="/classes" icon={FaBookmark}>
                Classes
            </SidebarItem>
            <SidebarItem href="/preferences" icon={FaGear}>
                Preferences
            </SidebarItem>

            <div className="mt-auto">
                {status === 'loading' ? (
                    // TODO: loading UI
                    <div>...</div>
                ) : !user ? (
                    <SignInButton />
                ) : (
                    <button
                        className="w-full px-2 py-1 sm:-ml-1 sm:mr-2 rounded flex gap-2 items-center font-semibold text-secondary dark:text-secondary-dark hover:bg-theme/30 dark:hover:bg-theme-dark/30 transition duration-200"
                        onClick={() => signOut(auth)}
                    >
                        <FirebaseUserDataUpdater />

                        <div className="size-10 rounded-full bg-gray-200 dark:bg-content-dark flex items-center justify-center text-lg">
                            {user.displayName?.[0].toUpperCase()}
                        </div>

                        <span className="hidden sm:block">
                            {user.displayName}
                        </span>
                    </button>
                )}
            </div>
        </aside>
    )
}
