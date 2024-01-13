'use client'

import type {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {IconType} from 'react-icons';


type SidebarItemProps = {
    href: string,
    icon: IconType,
    children: ReactNode
}
export default function SidebarItem(props: SidebarItemProps) {
    const pathname = usePathname();
    const active = pathname === props.href;

    const Icon = props.icon;

    return (
        <Link
            href={props.href}
            className={'flex gap-3 text-lg sm:text-base items-center text-secondary dark:text-secondary-dark rounded sm:rounded-r-none transition duration-200 px-4 sm:pr-12 py-2 ' + (active ? 'font-semibold bg-theme !text-white' : 'hover:bg-theme/30 dark:hover:text-white')}
        >
            <Icon className="flex-none pb-0.5" />
            <p className="hidden sm:block">{props.children}</p>
        </Link>
    )
}
