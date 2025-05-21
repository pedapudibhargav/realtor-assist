import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientInformation from '../ClientInformation';

describe('ClientInformation Component', () => {
  const mockOnChange = jest.fn();
  const mockData = {
    buyersInformation: {
      buyerName: '',
      phoneNumber: '',
      emailAddress: '',
      currentAddress: '',
      notes: ''
    },
    sellersInformation: {
      sellerName: '',
      phoneNumber: '',
      emailAddress: '',
      currentAddress: '',
      notes: ''
    }
  };

  it('renders the form fields correctly', () => {
    render(<ClientInformation data={mockData} onChange={mockOnChange} />);

    expect(screen.getAllByLabelText('Buyer Name').length).toBe(1);
    expect(screen.getAllByLabelText('Phone Number').length).toBe(2);
    expect(screen.getAllByLabelText('Email Address').length).toBe(2);
    expect(screen.getAllByLabelText('Current Address').length).toBe(2);
    expect(screen.getAllByLabelText('Notes').length).toBe(2);
  });

  it('calls onChange when form fields are updated', () => {
    render(<ClientInformation data={mockData} onChange={mockOnChange} />);

    fireEvent.change(screen.getAllByLabelText('Buyer Name')[0], { target: { value: 'John Doe' } });
    fireEvent.change(screen.getAllByLabelText('Phone Number')[0], { target: { value: '1234567890' } });
    fireEvent.change(screen.getAllByLabelText('Email Address')[0], { target: { value: 'john.doe@example.com' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});