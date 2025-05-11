import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LegalRepresentation from '../LegalRepresentation';

describe('LegalRepresentation Component', () => {
  const mockOnChange = jest.fn();
  const mockData = {
    sameLawFirmRepresentingBothParties: false,
    buyerLegalCounsel: {
      lawyerName: '',
      phoneNumber: '',
      emailAddress: '',
      lawFirm: '',
      notes: ''
    },
    sellerLegalCounsel: {
      lawyerName: '',
      phoneNumber: '',
      emailAddress: '',
      lawFirm: '',
      notes: ''
    }
  };

  it('renders the form fields correctly', () => {
    render(<LegalRepresentation data={mockData} onChange={mockOnChange} />);

    expect(screen.getAllByLabelText('Lawyer Name').length).toBe(2);
    expect(screen.getAllByLabelText('Phone Number').length).toBe(2);
    expect(screen.getAllByLabelText('Email Address').length).toBe(2);
    expect(screen.getAllByLabelText('Law Firm').length).toBe(2);
    expect(screen.getAllByLabelText('Notes').length).toBe(2);
  });

  it('calls onChange when form fields are updated', () => {
    render(<LegalRepresentation data={mockData} onChange={mockOnChange} />);

    fireEvent.change(screen.getAllByLabelText('Lawyer Name')[0], { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getAllByLabelText('Phone Number')[0], { target: { value: '9876543210' } });
    fireEvent.change(screen.getAllByLabelText('Email Address')[0], { target: { value: 'jane.smith@example.com' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});