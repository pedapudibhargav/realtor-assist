'use client';
import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'react-bootstrap';

const dummyDocuments = [
	{
		id: 1,
		name: 'Purchase Agreement',
		property: '123 Main St',
		agent: 'Alice Johnson',
		received: '2025-05-15 10:30',
		priority: 'High',
		status: 'Ready for Review',
	},
	{
		id: 2,
		name: 'Disclosure Form',
		property: '456 Oak Ave',
		agent: 'Bob Smith',
		received: '2025-05-15 11:00',
		priority: 'Medium',
		status: 'In Review',
	},
	{
		id: 3,
		name: 'Inspection Report',
		property: '789 Pine Rd',
		agent: 'Carol Lee',
		received: '2025-05-15 12:15',
		priority: 'Low',
		status: 'Approved',
	},
	{
		id: 4,
		name: 'Title Document',
		property: '321 Maple Dr',
		agent: 'David Kim',
		received: '2025-05-15 13:45',
		priority: 'High',
		status: 'Ready for Review',
	},
	{
		id: 5,
		name: 'Appraisal',
		property: '654 Cedar Ln',
		agent: 'Eva Green',
		received: '2025-05-15 14:20',
		priority: 'Medium',
		status: 'In Review',
	},
	{
		id: 6,
		name: 'Loan Document',
		property: '987 Birch Blvd',
		agent: 'Frank Moore',
		received: '2025-05-15 15:10',
		priority: 'Low',
		status: 'Approved',
	},
	{
		id: 7,
		name: 'HOA Agreement',
		property: '246 Spruce Ct',
		agent: 'Grace Lee',
		received: '2025-05-15 16:00',
		priority: 'High',
		status: 'Ready for Review',
	},
	{
		id: 8,
		name: 'Final Walkthrough',
		property: '135 Elm St',
		agent: 'Henry Ford',
		received: '2025-05-15 17:30',
		priority: 'Medium',
		status: 'In Review',
	},
];

const statusOptions = ['All', 'Ready for Review', 'In Review', 'Approved'];

const priorityColors = {
	High: 'danger',
	Medium: 'warning',
	Low: 'secondary',
};

export default function DocumentQueue() {
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('All');
	const [sortBy, setSortBy] = useState('received');
	const [sortAsc, setSortAsc] = useState(true);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(1);
	const pageSize = 5;

	// Filter and sort
	const filteredDocs = useMemo(() => {
		let docs = dummyDocuments.filter(doc =>
			(status === 'All' || doc.status === status) &&
			doc.name.toLowerCase().includes(search.toLowerCase())
		);
		docs = docs.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) return sortAsc ? -1 : 1;
			if (a[sortBy] > b[sortBy]) return sortAsc ? 1 : -1;
			return 0;
		});
		return docs;
	}, [search, status, sortBy, sortAsc]);

	// Pagination
	const totalDocs = filteredDocs.length;
	const totalPages = Math.ceil(totalDocs / pageSize);
	const pagedDocs = filteredDocs.slice((page - 1) * pageSize, page * pageSize);

	// Selection
	const allSelected = pagedDocs.length > 0 && pagedDocs.every(doc => selected.includes(doc.id));
	const handleSelectAll = () => {
		if (allSelected) {
			setSelected(selected.filter(id => !pagedDocs.some(doc => doc.id === id)));
		} else {
			setSelected([...new Set([...selected, ...pagedDocs.map(doc => doc.id)])]);
		}
	};
	const handleSelect = (id) => {
		setSelected(selected.includes(id) ? selected.filter(sid => sid !== id) : [...selected, id]);
	};

	// Sorting
	const handleSort = (col) => {
		if (sortBy === col) {
			setSortAsc(!sortAsc);
		} else {
			setSortBy(col);
			setSortAsc(true);
		}
	};

	// Pagination controls
	const handlePage = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	// Bulk actions
	const hasSelection = selected.length > 0;

	return (
		<div className="document-queue-container">
			<Card>
				<CardBody>
					{/* Navbar */}
					<nav className="navbar rounded mb-3" >
						<div className="container-fluid">
							<span className="navbar-brand mb-0 h1">
								All Documents ({totalDocs})
							</span>
							<div className="d-flex align-items-center gap-2" style={{ maxWidth: 600, width: '100%' }}>
								<div className="input-group me-2">
									<span className="input-group-text"><i className="bi bi-search"></i></span>
									<input
										type="text"
										className="form-control"
										placeholder="Search documents..."
										value={search}
										onChange={e => { setSearch(e.target.value); setPage(1); }}
										aria-label="Search documents"
									/>
								</div>
								<div className="input-group">
									<span className="input-group-text">Status:</span>
									<select
										className="form-select"
										value={status}
										onChange={e => { setStatus(e.target.value); setPage(1); }}
									>
										{statusOptions.map(opt => (
											<option key={opt} value={opt}>{opt}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</nav>
					{/* Table */}
					<div className="table-responsive">
						<table className="table table-bordered table-striped align-middle">
							<thead>
								<tr>
									<th scope="col">
										<input
											type="checkbox"
											checked={allSelected}
											onChange={handleSelectAll}
											aria-label="Select all documents"
										/>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
										Documents <i className={`bi bi-arrow-down-up${sortBy === 'name' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('property')}>
										Property <i className={`bi bi-arrow-down-up${sortBy === 'property' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('agent')}>
										Agent <i className={`bi bi-arrow-down-up${sortBy === 'agent' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('received')}>
										Received <i className={`bi bi-arrow-down-up${sortBy === 'received' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('priority')}>
										Priority <i className={`bi bi-arrow-down-up${sortBy === 'priority' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col" style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
										Status <i className={`bi bi-arrow-down-up${sortBy === 'status' ? '' : ' text-muted'}`}></i>
									</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{pagedDocs.map(doc => (
									<tr key={doc.id} style={{ height: 64 }}>
										<td>
											<input
												type="checkbox"
												checked={selected.includes(doc.id)}
												onChange={() => handleSelect(doc.id)}
												aria-label={`Select document ${doc.name}`}
											/>
										</td>
										<td>{doc.name}</td>
										<td>{doc.property}</td>
										<td>{doc.agent}</td>
										<td>{doc.received}</td>
										<td>
											<span className={`badge bg-${priorityColors[doc.priority]}`}>{doc.priority}</span>
										</td>
										<td>
											<span className={`badge bg-${doc.status === 'Approved' ? 'success' : doc.status === 'In Review' ? 'warning' : 'info'} text-dark`}>{doc.status}</span>
										</td>
										<td>
											{
												doc.status === 'In Review' ?
													<button className="btn btn-outline-primary btn-sm me-2">Review</button> :
													<button className="btn btn-outline-success btn-sm">Continue</button>
											}
										</td>
									</tr>
								))}
								{pagedDocs.length === 0 && (
									<tr>
										<td colSpan={8} className="text-center text-muted">No documents found.</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					{/* Bulk actions */}
					<div className="d-flex justify-content-between align-items-center my-3">
						<div>{hasSelection ? `${selected.length} items selected` : ''}</div>
						<div className="d-flex gap-2">
							<button className="btn btn-success" disabled={!hasSelection}>Approve Selected</button>
							<button className="btn btn-outline-primary" disabled={!hasSelection}>Download Selected</button>
						</div>
					</div>
					{/* Pagination */}
					<div className="d-flex justify-content-between align-items-center">
						<div>
							Showing {totalDocs === 0 ? 0 : (page - 1) * pageSize + 1}
							-{Math.min(page * pageSize, totalDocs)} of {totalDocs} documents
						</div>
						<nav>
							<ul className="pagination mb-0">
								<li className={`page-item${page === 1 ? ' disabled' : ''}`}>
									<button className="page-link" onClick={() => handlePage(page - 1)} disabled={page === 1}>
										Previous
									</button>
								</li>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
									<li key={p} className={`page-item${p === page ? ' active' : ''}`}>
										<button className="page-link" onClick={() => handlePage(p)}>{p}</button>
									</li>
								))}
								<li className={`page-item${page === totalPages ? ' disabled' : ''}`}>
									<button className="page-link" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>
										Next
									</button>
								</li>
							</ul>
						</nav>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}