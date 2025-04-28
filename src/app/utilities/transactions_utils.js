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
    buyer: "Buyer",
    seller: "Seller",
    landlord: "Landlord",
    tenant: "Tenant",
    seller_agent: "Seller Agent",
    buyer_agent: "Buyer Agent",
    landlord_agent: "Landlord Agent",
    tenant_agent: "Tenant Agent",
    appraiser: "Appraiser",
    home_inspector: "Home Inspector",
    mortgage_broker: "Mortgage Broker",
    title_company: "Title Company",
    closing_attorney: "Closing Attorney",
    insurance_agent: "Insurance Agent",
    property_manager: "Property Manager",
    real_estate_agent: "Real Estate Agent",
    other: "Other",
}));