{/* <option value="buy">Buy a property</option>
<option value="sale">Listing for Sale</option>
<option value="lease">Listing for Lease</option>
<option value="other">Other</option> */}

export const TransactionTypesMap = new Map(Object.entries({
    buy: "Buy a property",
    sale: "Listing for Sale",
    lease: "Listing for Lease",
    other: "Other",
}));


export const TransactionRolesMap = new Map(Object.entries({
  buyer: { label: "Buyer", fieldLabel: "Current Address", profession: 'client' },
  seller: { label: "Seller", fieldLabel: "Current Address", profession: 'client' },
  landlord: { label: "Landlord", fieldLabel: "Current Address", profession: 'client' },
  tenant: { label: "Tenant", fieldLabel: "Brokerage", profession: 'client' },
  seller_agent: { label: "Seller Agent", fieldLabel: "Brokerage", profession: 'agent' },
  buyer_agent: { label: "Buyer Agent", fieldLabel: "Brokerage", profession: 'agent' },
  landlord_agent: { label: "Landlord Agent", fieldLabel: "Brokerage", profession: 'agent' },
  tenant_agent: { label: "Tenant Agent", fieldLabel: "Brokerage", profession: 'agent' },
  appraiser: { label: "Appraiser", fieldLabel: "Company Name" , profession: 'appraiser'  },
  home_inspector: { label: "Home Inspector", fieldLabel: "Company Name", profession: 'home-inspector'  },
  mortgage_broker: { label: "Mortgage Broker", fieldLabel: "Company Name", profession: 'mortgage-broker'  },
  title_company: { label: "Title Company", fieldLabel: "Company Name", profession: 'title-company'  },
  closing_attorney: { label: "Closing Attorney", fieldLabel: "Company Name", profession: 'attorney'  },
  insurance_agent: { label: "Insurance Agent", fieldLabel: "Company Name", profession: 'insurance-agent'  },
  property_manager: { label: "Property Manager", fieldLabel: "Company Name", profession: 'property-manager'  },
  real_estate_agent: { label: "Real Estate Agent", fieldLabel: "Brokerage", profession: 'agent'},
  other: { label: "Other", fieldLabel: "Company Name", profession: 'other' },
}));