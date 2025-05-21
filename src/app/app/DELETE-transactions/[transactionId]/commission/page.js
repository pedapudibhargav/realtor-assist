'use client';
import { useState } from "react";
import { Card, CardBody, Tabs, Tab, Form, InputGroup, FormControl, Row, Col, ButtonGroup, Button } from "react-bootstrap";

export default function CommissionPage() {
    const [commisionDetails, setCommissionDetails] = useState({
        commissionType: "flat",
        flatCommission: {
            rate: "",
        },
        tieredCommission: {
            firstTierRate: "",
            firstTierCap: "",
            secondTierRate: "",
        },
        representation: "",
        sellPrice: "",
        newBuild: false,
        sellerSideCommission: {
            grossCommission: "",
            gstPercentage: "",
            gstOnMLSFee: "",
            netCommission: "",
        },
        buyerSideCommission: {
            grossCommission: "",
            gstPercentage: "",
            gstOnMLSFee: "",
            netCommission: "",
        },
        totalCommission: "",
        includeReferral: false,
        referralAmount: "",
    });

    const [errors, setErrors] = useState([]);

    // Validation function
    const validate = (details) => {
        const errs = [];
        const d = details;
        if (!d.sellPrice || isNaN(parseFloat(d.sellPrice)) || parseFloat(d.sellPrice) <= 0) {
            errs.push('Sell Price must be a positive number.');
        }
        if (d.commissionType === 'flat') {
            if (!d.flatCommission.rate || isNaN(parseFloat(d.flatCommission.rate)) || parseFloat(d.flatCommission.rate) <= 0) {
                errs.push('Flat Commission Rate must be a positive number.');
            }
        } else if (d.commissionType === 'tiered') {
            if (!d.tieredCommission.firstTierRate || isNaN(parseFloat(d.tieredCommission.firstTierRate)) || parseFloat(d.tieredCommission.firstTierRate) <= 0) {
                errs.push('First Tier Rate must be a positive number.');
            }
            if (!d.tieredCommission.firstTierCap || isNaN(parseFloat(d.tieredCommission.firstTierCap)) || parseFloat(d.tieredCommission.firstTierCap) <= 0) {
                errs.push('First Tier Cap must be a positive number.');
            }
            if (!d.tieredCommission.secondTierRate || isNaN(parseFloat(d.tieredCommission.secondTierRate)) || parseFloat(d.tieredCommission.secondTierRate) < 0) {
                errs.push('Second Tier Rate must be zero or a positive number.');
            }
        }
        if (!d.representation) {
            errs.push('Please select who you represented.');
        }
        if (d.sellerSideCommission.gstPercentage && (isNaN(parseFloat(d.sellerSideCommission.gstPercentage)) || parseFloat(d.sellerSideCommission.gstPercentage) < 0)) {
            errs.push('Seller GST% must be zero or a positive number.');
        }
        if (d.buyerSideCommission.gstPercentage && (isNaN(parseFloat(d.buyerSideCommission.gstPercentage)) || parseFloat(d.buyerSideCommission.gstPercentage) < 0)) {
            errs.push('Buyer GST% must be zero or a positive number.');
        }
        if (d.includeReferral && (!d.referralAmount || isNaN(parseFloat(d.referralAmount)) || parseFloat(d.referralAmount) < 0)) {
            errs.push('Referral amount must be zero or a positive number if included.');
        }
        return errs;
    };

    // Helper to update nested state
    const handleFieldChange = (section, field, value) => {
        setCommissionDetails(prev => {
            const updated = {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            };
            setErrors(validate(updated));
            return updated;
        });
    };

    // Generic handler for top-level fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCommissionDetails(prev => {
            const updated = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
            setErrors(validate(updated));
            return updated;
        });
    };

    // Radio handler for representation
    const handleRepresentationChange = (e) => {
        setCommissionDetails(prev => {
            const updated = {
                ...prev,
                representation: e.target.value
            };
            setErrors(validate(updated));
            return updated;
        });
    };

    // Calculation logic for commissions
    const formSubmissionHandler = (e) => {
        if (e) e.preventDefault();
        const validationErrors = validate(commisionDetails);
        setErrors(validationErrors);
        if (validationErrors.length > 0) return;
        const d = { ...commisionDetails };
        const price = parseFloat(d.sellPrice) || 0;
        let sellerGross = 0, buyerGross = 0;
        // Commission calculation
        if (d.commissionType === 'flat') {
            const rate = parseFloat(d.flatCommission.rate) || 0;
            sellerGross = d.representation === 'seller' || d.representation === 'both' ? price * (rate / 100) : 0;
            buyerGross = d.representation === 'buyer' || d.representation === 'both' ? price * (rate / 100) : 0;
        } else if (d.commissionType === 'tiered') {
            const firstTierRate = parseFloat(d.tieredCommission.firstTierRate) || 0;
            const firstTierCap = parseFloat(d.tieredCommission.firstTierCap) || 0;
            const secondTierRate = parseFloat(d.tieredCommission.secondTierRate) || 0;
            let firstTierAmount = Math.min(price, firstTierCap);
            let secondTierAmount = Math.max(0, price - firstTierCap);
            const total = (firstTierAmount * (firstTierRate / 100)) + (secondTierAmount * (secondTierRate / 100));
            sellerGross = d.representation === 'seller' || d.representation === 'both' ? total : 0;
            buyerGross = d.representation === 'buyer' || d.representation === 'both' ? total : 0;
        }
        // GST and Net calculations
        const sellerGstPct = parseFloat(d.sellerSideCommission.gstPercentage) || 0;
        const buyerGstPct = parseFloat(d.buyerSideCommission.gstPercentage) || 0;
        const sellerGst = sellerGross * (sellerGstPct / 100);
        const buyerGst = buyerGross * (buyerGstPct / 100);
        const sellerGrossGst = sellerGross + sellerGst;
        const buyerGrossGst = buyerGross + buyerGst;
        // MLS fee GST (dummy, can be replaced with actual logic)
        const sellerGstOnMLS = sellerGross * 0.05;
        const buyerGstOnMLS = buyerGross * 0.05;
        // Net commission
        const sellerNet = sellerGrossGst - sellerGstOnMLS;
        const buyerNet = buyerGrossGst - buyerGstOnMLS;
        // Total commission
        let totalCommission = sellerNet + buyerNet;
        if (d.includeReferral && d.referralAmount) {
            totalCommission -= parseFloat(d.referralAmount) || 0;
        }
        const newDetails = { ...commisionDetails };

        // Perform calculations and update newDetails
        // ... your calculation logic ...
        newDetails.sellerSideCommission = {
            ...newDetails.sellerSideCommission,
            grossCommission: sellerGross.toFixed(2),
            gstOnMLSFee: sellerGstOnMLS.toFixed(2),
            netCommission: sellerNet.toFixed(2),
        };
        newDetails.buyerSideCommission = {
            ...newDetails.buyerSideCommission,
            grossCommission: buyerGross.toFixed(2),
            gstOnMLSFee: buyerGstOnMLS.toFixed(2),
            netCommission: buyerNet.toFixed(2),
        };
        newDetails.totalCommission = totalCommission.toFixed(2);

        // Log the updated object
        console.log("Commission Details: ", newDetails);

        // Update the state
        setCommissionDetails(newDetails);
    };

    const handleTabSelect = (tab) => {
        setCommissionDetails((prevDetails) => ({
            ...prevDetails,
            commissionType: tab,
        }));
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <h4>Real Estate Commission</h4>
                    <Card>
                        <CardBody>
                            <Form onSubmit={formSubmissionHandler}>
                                {errors.length > 0 && (
                                    <div className="mb-3">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <p>Pick your commision type:</p>
                                    <ButtonGroup>
                                        <Button
                                            variant={commisionDetails.commissionType === "flat" ? "primary" : "outline-primary"}
                                            onClick={() => handleTabSelect("flat")}
                                        >
                                            Flat Rate Commission
                                        </Button>
                                        <Button
                                            variant={commisionDetails.commissionType === "tiered" ? "primary" : "outline-primary"}
                                            onClick={() => handleTabSelect("tiered")}
                                        >
                                            Tiered Based Commission
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                {
                                    commisionDetails.commissionType === "flat" && (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Commission Rate (%)</Form.Label>
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Enter rate"
                                                    aria-label="Commission Rate"
                                                    type="number"
                                                    value={commisionDetails.flatCommission.rate}
                                                    onChange={e => handleFieldChange('flatCommission', 'rate', e.target.value)}
                                                />
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    )
                                }
                                {
                                    commisionDetails.commissionType === "tiered" && (
                                        <>
                                            {/* Tiered rate section - start */}
                                            <Row className="mb-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>First Tier Rate (%)</Form.Label>
                                                        <InputGroup>
                                                            <FormControl
                                                                placeholder="Enter rate"
                                                                type="number"
                                                                value={commisionDetails.tieredCommission.firstTierRate}
                                                                onChange={e => handleFieldChange('tieredCommission', 'firstTierRate', e.target.value)}
                                                            />
                                                            <InputGroup.Text>%</InputGroup.Text>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>First Tier Cap ($)</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <FormControl
                                                                placeholder="Enter cap"
                                                                type="number"
                                                                value={commisionDetails.tieredCommission.firstTierCap}
                                                                onChange={e => handleFieldChange('tieredCommission', 'firstTierCap', e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Second Tier Rate (%)</Form.Label>
                                                        <InputGroup>
                                                            <FormControl
                                                                placeholder="Enter rate"
                                                                type="number"
                                                                value={commisionDetails.tieredCommission.secondTierRate}
                                                                onChange={e => handleFieldChange('tieredCommission', 'secondTierRate', e.target.value)}
                                                            />
                                                            <InputGroup.Text>%</InputGroup.Text>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* Tiered rate section - end */}
                                        </>
                                    )
                                }
                                <br />
                                <hr />
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label>Who did you represent?</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Buyer"
                                            name="representation"
                                            type="radio"
                                            value="buyer"
                                            checked={commisionDetails.representation === 'buyer'}
                                            onChange={handleRepresentationChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Seller"
                                            name="representation"
                                            type="radio"
                                            value="seller"
                                            checked={commisionDetails.representation === 'seller'}
                                            onChange={handleRepresentationChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Both (Dual Agency)"
                                            name="representation"
                                            type="radio"
                                            value="both"
                                            checked={commisionDetails.representation === 'both'}
                                            onChange={handleRepresentationChange}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sell Price ($)</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl
                                            placeholder="Enter price"
                                            aria-label="Sell Price"
                                            type="number"
                                            name="sellPrice"
                                            value={commisionDetails.sellPrice}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>New Build (Commission on Net Price Only)</Form.Label>
                                    <Form.Check type="switch" name="newBuild" checked={commisionDetails.newBuild} onChange={handleChange} />
                                </Form.Group>

                                <hr />

                                <Row>
                                    <Col>
                                        <Card className="bg-primary text-white">
                                            <CardBody>
                                                <h5>Seller Side Commission</h5>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gross Commission</Form.Label>
                                                    <FormControl disabled value={commisionDetails.sellerSideCommission.grossCommission} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>GST%</Form.Label>
                                                    <InputGroup>
                                                        <FormControl type="number" placeholder="Enter %" value={commisionDetails.sellerSideCommission.gstPercentage} onChange={e => handleFieldChange('sellerSideCommission', 'gstPercentage', e.target.value)} />
                                                        <InputGroup.Text>{commisionDetails.sellerSideCommission.gstPercentage ? `${commisionDetails.sellerSideCommission.gstPercentage}%` : 'Calculated Value'}</InputGroup.Text>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gross + GST</Form.Label>
                                                    <FormControl disabled value={commisionDetails.sellerSideCommission.grossCommission && commisionDetails.sellerSideCommission.gstPercentage ? (parseFloat(commisionDetails.sellerSideCommission.grossCommission) + (parseFloat(commisionDetails.sellerSideCommission.grossCommission) * (parseFloat(commisionDetails.sellerSideCommission.gstPercentage) / 100))).toFixed(2) : ''} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>GST on MLS fee</Form.Label>
                                                    <FormControl disabled value={commisionDetails.sellerSideCommission.gstOnMLSFee} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Net Commission</Form.Label>
                                                    <FormControl disabled value={commisionDetails.sellerSideCommission.netCommission} placeholder="Calculated Value" />
                                                </Form.Group>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="bg-success text-white">
                                            <CardBody>
                                                <h5>Buyer Side Commission</h5>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gross Commission</Form.Label>
                                                    <FormControl disabled value={commisionDetails.buyerSideCommission.grossCommission} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>GST%</Form.Label>
                                                    <InputGroup>
                                                        <FormControl type="number" placeholder="Enter %" value={commisionDetails.buyerSideCommission.gstPercentage} onChange={e => handleFieldChange('buyerSideCommission', 'gstPercentage', e.target.value)} />
                                                        <InputGroup.Text>{commisionDetails.buyerSideCommission.gstPercentage ? `${commisionDetails.buyerSideCommission.gstPercentage}%` : 'Calculated Value'}</InputGroup.Text>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gross + GST</Form.Label>
                                                    <FormControl disabled value={commisionDetails.buyerSideCommission.grossCommission && commisionDetails.buyerSideCommission.gstPercentage ? (parseFloat(commisionDetails.buyerSideCommission.grossCommission) + (parseFloat(commisionDetails.buyerSideCommission.grossCommission) * (parseFloat(commisionDetails.buyerSideCommission.gstPercentage) / 100))).toFixed(2) : ''} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>GST on MLS fee</Form.Label>
                                                    <FormControl disabled value={commisionDetails.buyerSideCommission.gstOnMLSFee} placeholder="Calculated Value" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Net Commission</Form.Label>
                                                    <FormControl disabled value={commisionDetails.buyerSideCommission.netCommission} placeholder="Calculated Value" />
                                                </Form.Group>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>

                                <Form.Group className="mt-3">
                                    <Form.Label>Total Commission</Form.Label>
                                    <FormControl disabled value={commisionDetails.totalCommission} placeholder="Total Net Commission" />
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Include Referral"
                                        name="includeReferral"
                                        checked={commisionDetails.includeReferral}
                                        onChange={handleChange}
                                    />
                                    {commisionDetails.includeReferral && (
                                        <InputGroup className="mt-2">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <FormControl placeholder="Enter referral amount" type="number" name="referralAmount" value={commisionDetails.referralAmount} onChange={handleChange} />
                                        </InputGroup>
                                    )}
                                </Form.Group>
                                <div className="mt-4">
                                    <Button type="submit" variant="success">Calculate Commission</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
