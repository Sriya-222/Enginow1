const courses = [
    {
        title: 'Complete React Developer in 2025',
        slug: 'complete-react-developer-2025',
        description: 'Become a Senior React Developer! Build a massive E-commerce app with Redux, Hooks, GraphQL, ContextAPI, Stripe, Firebase.',
        price: 0,
        category: 'Development',
        difficulty: 'Intermediate',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        lessons: [
            {
                title: 'Introduction to React',
                contentHtml: '<p>Welcome to the course! React is a library...</p>',
                order: 1,
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Rick Roll placeholder :D
            },
            {
                title: 'Key Concepts',
                contentHtml: '<p>Components, State, Props...</p>',
                order: 2,
            }
        ]
    },
    {
        title: 'Node.js API Masterclass',
        slug: 'nodejs-api-masterclass',
        description: 'Build a backend REST API with Node.js, Express, and MongoDB. thorough authentication, security, and deployment.',
        price: 19.99,
        category: 'Backend',
        difficulty: 'Advanced',
        thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
        lessons: [
            {
                title: 'Server Setup',
                contentHtml: '<p>Initializing express...</p>',
                order: 1,
            }
        ]
    },
    {
        title: 'UI/UX Design Fundamentals',
        slug: 'ui-ux-design-fundamentals',
        description: 'Learn how to design beautiful user interfaces and user experiences. Figma, colors, typography, and layout.',
        price: 49.99,
        category: 'Design',
        difficulty: 'Beginner',
        thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
        lessons: [
            {
                title: 'Color Theory',
                contentHtml: '<p>Understanding the color wheel...</p>',
                order: 1,
            }
        ]
    },
    {
        title: 'Python for Data Science',
        slug: 'python-data-science',
        description: 'Master Python and its libraries like Pandas, NumPy, and Matplotlib. Visualise data and build machine learning models.',
        price: 0,
        category: 'Data Science',
        difficulty: 'Beginner',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2074&auto=format&fit=crop',
        lessons: [
            {
                title: 'Python Basics',
                contentHtml: '<p>Variables and loops...</p>',
                order: 1,
            }
        ]
    }
];

export default courses;
