import React from 'react';
import { Link } from 'react-router-dom';


const sitemapLinks = [
    { path: '/', label: 'Home' },
    { path: '/code', label: 'Practice Coding' },
    { path: '/forums', label: 'Forums' },
    { path: '/docs', label: 'Read through code docs' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Register' },
    { path: '/sitemap', label: 'Sitemap' },
];

const Sitemap = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Sitemap</h1>
        <ul>
            {sitemapLinks.map(link => (
                <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Sitemap;