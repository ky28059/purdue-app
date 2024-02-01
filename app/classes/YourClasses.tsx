'use client'

import {useContext} from 'react';
import YourClass from '@/app/classes/YourClass';

// Contexts
import UserDataContext from '@/contexts/UserDataContext';
import ClassesContext from '@/contexts/ClassesContext';


export default function YourClasses() {
    const classes = useContext(ClassesContext);
    const {data} = useContext(UserDataContext);

    return (
        <div className="hidden sm:block sticky w-96 h-max top-20">
            <h2 className="text-2xl font-bold mb-4">Your classes</h2>

            {data.courseIds.length === 0 ? (
                <p className="font-light italic text-sm">
                    No classes to show. Add classes by selecting them on the left.
                </p>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {data.courseIds.sort().map((id) => (
                        <YourClass {...classes[id]} key={id} />
                    ))}
                </div>
            )}
        </div>
    )
}
