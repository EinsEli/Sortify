"use client";
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';

import React from 'react';
import { Card, CardContent } from '../ui/card';

export default function CodeBlock({ language, children }: { language: string, children: React.ReactNode }) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<Card className='bg-neutral-950'>
			<CardContent className='p-1'>
				<pre className={`language-${language} !m-0 !w-full !bg-neutral-950`} >
					<code>{children}</code>
				</pre>
			</CardContent>
		</Card>
	);
}