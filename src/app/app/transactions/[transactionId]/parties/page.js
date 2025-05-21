'use client';
import { TransactionRolesMap, TransactionTypesMap } from '@/app/utilities/transactions_utils';
import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody } from 'react-bootstrap';
import './parties.css';
import PartiesAgency from './PartiesAgency';
import ClientInformation from './ClientInformation';
import LegalRepresentation from './LegalRepresentation';
import OtherParties from './OtherParties';

const defaultPartiesData = {
  partiesAgency: {
    dualAgency: false,
    agentName: 'John Doe',
    phoneNumber: '123-456-7890',
    emailAddress: 'johndoe@example.com',
    brokerage: 'Best Realty',
    notes: 'Experienced agent with 10 years in the industry.'
  },
  clientInformation: {
    buyersInformation: {
      buyerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
      emailAddress: 'janesmith@example.com',
      currentAddress: '123 Elm Street, Springfield, IL',
      notes: 'First-time homebuyer.'
    },
    sellersInformation: {
      sellerName: 'Robert Brown',
      phoneNumber: '555-123-4567',
      emailAddress: 'robertbrown@example.com',
      currentAddress: '456 Oak Avenue, Springfield, IL',
      notes: 'Selling due to relocation.'
    }
  },
  legalRepresentation: {
    sameLawFirmRepresentingBothParties: false,
    buyerLegalCounsel: {
      lawyerName: 'Alice Johnson',
      phoneNumber: '111-222-3333',
      emailAddress: 'alicejohnson@lawfirm.com',
      lawFirm: 'Johnson & Associates',
      notes: 'Specializes in real estate law.'
    },
    sellerLegalCounsel: {
      lawyerName: 'Michael Lee',
      phoneNumber: '444-555-6666',
      emailAddress: 'michaellee@lawfirm.com',
      lawFirm: 'Lee Legal Group',
      notes: 'Expert in property transactions.'
    }
  },
  otherParties: [
    {
      role: 'Home Inspector',
      name: 'Emily Davis',
      phoneNumber: '777-888-9999',
      emailAddress: 'emilydavis@inspection.com',
      notes: 'Highly recommended by local agents.'
    },
    {
      role: 'Appraiser',
      name: 'David Wilson',
      phoneNumber: '222-333-4444',
      emailAddress: 'davidwilson@appraisal.com',
      notes: 'Certified appraiser with 15 years of experience.'
    }
  ]
};

export default function TransactionParties() {
  const [partiesData, setPartiesData] = useState(defaultPartiesData);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const saveDataToDB = (updatedData) => {
    console.log('Saving data to DB:', updatedData);
  };

  const handlePartiesAgencyChange = (data) => {
    setPartiesData((prev) => {
      const updatedData = { ...prev, partiesAgency: data };
      saveDataToDB(updatedData);
      return updatedData;
    });
  };

  const handleClientInformationChange = (data) => {
    setPartiesData((prev) => {
      const updatedData = { ...prev, clientInformation: data };
      saveDataToDB(updatedData);
      return updatedData;
    });
  };

  const handleLegalRepresentationChange = (data) => {
    setPartiesData((prev) => {
      const updatedData = { ...prev, legalRepresentation: data };
      saveDataToDB(updatedData);
      return updatedData;
    });
  };

  const handleOtherPartiesChange = (data) => {
    setPartiesData((prev) => {
      const updatedData = { ...prev, otherParties: data };
      saveDataToDB(updatedData);
      return updatedData;
    });
  };

  const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    setShowScrollButton(!isBottom);
  };

  const checkContentBelowFold = () => {
    const isContentBelowFold = document.body.offsetHeight > window.innerHeight;
    setShowScrollButton(isContentBelowFold);
  };

  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
  };

  useEffect(() => {
    checkContentBelowFold();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='transaction-parties-container'>
      <div className="row">
        <div className="col">
          <PartiesAgency
            data={partiesData.partiesAgency}
            onChange={handlePartiesAgencyChange}
          />
        </div>
        <div className="col">
          <ClientInformation
            data={partiesData.clientInformation}
            onChange={handleClientInformationChange}
          />
        </div>
      </div>

      <br />

      <br />
      <div className="row">
        <div className="col">
          <LegalRepresentation
            data={partiesData.legalRepresentation}
            onChange={handleLegalRepresentationChange}
          />
        </div>
        <div className="col">
          <OtherParties
            data={partiesData.otherParties}
            onChange={handleOtherPartiesChange}
          />
        </div>
      </div>

      {showScrollButton && (
        <Button
          variant="primary"
          className="scroll-down-button"
          onClick={scrollToNextSection}
          style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000, borderRadius: '40%', padding: '1rem 1rem' }}
        >
          <i className="bi bi-chevron-double-down"></i>
        </Button>
      )}
    </div>
  );
}
