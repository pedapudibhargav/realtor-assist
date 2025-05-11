import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PartiesAgency from '../PartiesAgency';

describe('PartiesAgency Component', () => {
  const mockOnChange = jest.fn();
  const mockData = {
    dualAgency: false,
    agentName: '',
    phoneNumber: '',
    emailAddress: '',
    brokerage: '',
    notes: ''
  };

  it('renders the form fields correctly', () => {
    render(<PartiesAgency data={mockData} onChange={mockOnChange} />);

    expect(screen.getByLabelText('Agent Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Brokerage')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
  });

  it('calls onChange when form fields are updated', () => {
    render(<PartiesAgency data={mockData} onChange={mockOnChange} />);

    fireEvent.change(screen.getByLabelText('Agent Name'), { target: { value: 'Agent Smith' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'agent.smith@example.com' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});