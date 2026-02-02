import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import CourseList from './CourseList';

// Mock axios
vi.mock('axios');

describe('CourseList Component', () => {
    it('renders loading state initially', async () => {
        // Mock implementation to hang
        axios.get.mockImplementation(() => new Promise(() => {}));
        
        render(
            <BrowserRouter>
                <CourseList />
            </BrowserRouter>
        );
        // If loading text is 'Loading...', regex /loading/i should match. 
        // Maybe it needs waitFor? No, it should be immediate.
        // Let's debug by printing screen.debug() if it fails, but for now let's assume text might be slightly different or need await.
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('renders courses after fetch', async () => {
        const mockCourses = [
            { _id: '1', title: 'Test Course 1', price: 10, category: 'Test', difficulty: 'Easy', thumbnailUrl: '' },
            { _id: '2', title: 'Test Course 2', price: 20, category: 'Test', difficulty: 'Medium', thumbnailUrl: '' }
        ];

        axios.get.mockResolvedValue({ data: mockCourses });

        render(
            <BrowserRouter>
                <CourseList />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Course 1')).toBeInTheDocument();
            expect(screen.getByText('Test Course 2')).toBeInTheDocument();
        });
    });
});
