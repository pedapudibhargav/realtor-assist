'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Badge, Button, InputGroup, FormControl } from 'react-bootstrap';

const dummyAgents = [
	{
		id: 1,
		name: 'Alice Johnson',
		status: 'active',
		role: 'Lead Agent',
		transactions: 24,
		activeDeals: 5,
		detailsLink: '/agents/1',
	},
	{
		id: 2,
		name: 'Bob Smith',
		status: 'inactive',
		role: 'Associate',
		transactions: 12,
		activeDeals: 2,
		detailsLink: '/agents/2',
	},
	{
		id: 3,
		name: 'Carol Lee',
		status: 'active',
		role: 'Senior Agent',
		transactions: 29,
		activeDeals: 7,
		detailsLink: '/agents/3',
	},
	{
		id: 4,
		name: 'David Kim',
		status: 'active',
		role: 'Agent',
		transactions: 18,
		activeDeals: 3,
		detailsLink: '/agents/4',
	},
	{
		id: 5,
		name: 'Eva Green',
		status: 'inactive',
		role: 'Associate',
		transactions: 7,
		activeDeals: 1,
		detailsLink: '/agents/5',
	},
	{
		id: 6,
		name: 'Frank Moore',
		status: 'active',
		role: 'Agent',
		transactions: 15,
		activeDeals: 4,
		detailsLink: '/agents/6',
	},
];

function getInitials(name) {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
}

export default function Agents() {
	const [agents, setAgents] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setAgents(dummyAgents);
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleReset = () => {
		setSearch('');
	};

	const filteredAgents = agents.filter((agent) =>
		agent.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			{/* Action nav with search */}
			<nav className="navbar mb-3">
				<div className="container-fluid">
					<span className="navbar-brand mb-0 h1">Agents</span>
					<div style={{ maxWidth: 350, width: '100%' }}>
						<div className="input-group">
							<span className="input-group-text">
								<i className="bi bi-search"></i>
							</span>
							<input
								type="text"
								className="form-control"
								placeholder="Search agent by name..."
								value={search}
								onChange={handleSearch}
								aria-label="Search agent by name"
							/>
							<button
								className="btn btn-primary"
								type="button"
								onClick={handleReset}
								title="Reset search"
								id="button-addon2"
							>
								<i className="bi bi-arrow-clockwise"></i>
							</button>
						</div>
					</div>
				</div>
			</nav>
			<div className="row g-3">
				{filteredAgents.map((agent) => (
					<div className="col-12" key={agent.id}>
						<Card className="align-items-center p-2">
							<CardBody className="d-flex w-100 justify-content-between align-items-center">
								<div className="d-flex align-items-center">
									{/* Avatar */}
									<div
										className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3 "
										style={{
											width: 56,
											height: 56,
											fontSize: 24,
											fontWeight: 600,
										}}
									>
										{getInitials(agent.name)}
									</div>
									<div>
										<div className="d-flex align-items-center mb-1">
											<span
												style={{
													fontSize: 20,
													fontWeight: 500,
												}}
											>
												{agent.name}
											</span>
											<Badge
												bg={
													agent.status === 'active'
														? 'success'
														: 'secondary'
												}
												className="ms-2"
												style={{ fontSize: 12 }}
											>
												{agent.status.charAt(0).toUpperCase() +
													agent.status.slice(1)}
											</Badge>
										</div>
										<div
											className="text-secondary"
											style={{ fontSize: 14 }}
										>
											{agent.role}
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center gap-4">
									<div className="text-end">
										<div
											style={{
												fontSize: 20,
												fontWeight: 500,
											}}
										>
											{agent.transactions}
										</div>
										<p
											className="mb-0 text-secondary"
											style={{ fontSize: 14 }}
										>
											Transactions
										</p>
									</div>
									<div className="text-end">
										<div
											style={{
												fontSize: 20,
												fontWeight: 500,
											}}
										>
											{agent.activeDeals}
										</div>
										<p
											className="mb-0 text-secondary"
											style={{ fontSize: 14 }}
										>
											Active Deals
										</p>
									</div>
									<Button
										variant="primary"
										href={agent.detailsLink}
										style={{ minWidth: 90 }}
									>
										Details
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}
