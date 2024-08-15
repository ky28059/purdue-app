import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

// Components
import Sidebar from '@/app/Sidebar';
import FirebaseProviders from '@/components/FirebaseProviders';
import UserDataProvider from '@/components/UserDataProvider';
import CurrentTimeProvider from '@/components/CurrentTimeProvider';
import ClassesProvider from '@/components/ClassesProvider';
import EventsProvider from '@/components/EventsProvider';
import FaviconHandler from '@/components/FaviconHandler';
import InstallModal from '@/components/InstallModal';

// Utils
import classes from '@/util/unitime';
import { THEME_COOKIE_NAME } from '@/util/config';

import './globals.css';


const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Pyrite';
const APP_DESC = 'A student-made schedule app for Purdue University!';
const TITLE_TEMPLATE = `%s | ${APP_NAME}`;

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        template: TITLE_TEMPLATE,
        absolute: APP_NAME
    },
    description: APP_DESC,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        title: APP_NAME
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            template: TITLE_TEMPLATE,
            absolute: APP_NAME
        },
        description: APP_DESC
    },
    twitter: {
        description: APP_DESC
    },
}

export const viewport: Viewport = {
    themeColor: '#131313'
}

export default async function Layout(props: { children: ReactNode }) {
    const theme = cookies().get(THEME_COOKIE_NAME)?.value;

    return (
        <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
            <body className="bg-content text-primary" style={inter.style}>
                <FirebaseProviders>
                    <UserDataProvider>
                        <CurrentTimeProvider>
                            <ClassesProvider classes={classes}>
                                <EventsProvider>
                                    <div className="flex">
                                        <Sidebar />

                                        {props.children}

                                        <FaviconHandler />
                                        <InstallModal />
                                    </div>
                                </EventsProvider>
                            </ClassesProvider>
                        </CurrentTimeProvider>
                    </UserDataProvider>
                </FirebaseProviders>
            </body>
        </html>
    )
}
