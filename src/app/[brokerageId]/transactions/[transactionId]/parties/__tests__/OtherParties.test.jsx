import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OtherParties from '../OtherParties';

describe('OtherParties Component', () => {
  const mockOnChange = jest.fn();
  const mockData = [
    {
      partyType: '',
      name: '',
      phoneNumber: '',
      emailAddress: '',
      company: '',
      notes: ''
    }
  ];

  it('renders the form fields correctly', () => {
    render(<OtherParties data={mockData} onChange={mockOnChange} />);

    expect(screen.getByText('Party Type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter company or organization')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter any additional notes')).toBeInTheDocument();
  });

  it('calls onChange when form fields are updated', () => {
    render(<OtherParties data={mockData} onChange={mockOnChange} />);

    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Enter email address'), { target: { value: 'john.doe@example.com' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});