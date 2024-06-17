"use client";
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';

import React from 'react';
import { Card, CardContent } from '../ui/card';

export default function CodeBlock({ language, children, ...props }: { language: string, children: React.ReactNode, className?: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <Card className={`bg-neutral-950 ${props.className}`} {...props}>
            <CardContent className='p-1'>
                <pre className={`language-${language} !m-0 !w-full !bg-neutral-950 max-h-80 dark-scrollbar`} suppressHydrationWarning>
                    <code suppressHydrationWarning>{children}</code>
                </pre>
            </CardContent>
        </Card>
    );
}