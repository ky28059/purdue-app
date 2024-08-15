import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

// Components
import InteractiveMap from '@/app/map/InteractiveMap';

// Utils
import buildings from '@/util/buildings';
import { THEME_COOKIE_NAME } from '@/util/config';
import { loadClasses } from '@/util/unitime';


export const metadata: Metadata = {
    title: 'Map',
    openGraph: {
        title: 'Map'
    }
}

export default async function Map() {
    const theme = cookies().get(THEME_COOKIE_NAME)?.value;
    const classes = await loadClasses()

    return (
        <main className="flex-grow flex flex-col xl:flex-row-reverse h-dvh gap-y-3">
            <div className="pt-16 pr-12 pl-8 xl:w-96">
                <h1 className="text-4xl font-bold mb-2">
                    Class map
                </h1>
                <p className="text-secondary italic text-sm">
                    Classes you add to your <Link href="/classes" className="text-theme hover:underline">schedule</Link>{' '}
                    will show up on the map as markers.
                </p>
            </div>

            <InteractiveMap
                buildings={buildings}
                theme={theme}
                classes={classes}
            />
        </main>
    )
}
