import React from "react";
import { createClient } from "@prismicio/client";
import Link from "next/link";

export default async function Header() {
    const client = createClient("pengu");
    let settings;
    try {
        settings = await client.getSingle("settings");
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return <header>Error loading settings</header>;
    }

    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
            <nav>
                <ul>
                    <li>
                        <Link href="/" aria-label="Home Page">
                            {settings.data.name}
                        </Link>
                    </li>
                    {settings.data.nav_item.map(({ link, label }, index) => (
                        <li key={index}>
                            <Link href={`/${(link as { uid: string }).uid}`} passHref>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}