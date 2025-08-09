'use client';
// 
import { useEffect, useState } from 'react';
import { formatINR, getPensionDetailsByBankCode, getPensionGroupedByBank } from '@/services/pension.service';
import { Button, Modal } from 'react-bootstrap';
// 
export default function Home() {
	// 
	const [isLoading, setIsLoading] = useState(true);
	const [isBankDataLoading, setIsBankDataLoading] = useState(false);
	const [jsonData, setJsonData] = useState<any[]>([]);
	const [bankData, setBankData] = useState<any[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	// 
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const x = await getPensionGroupedByBank();
			setJsonData(x);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	// 
	const handleShow = async (bankCode: string, bankName: string) => {
		setShowModal(true);
		setModalTitle(bankName);
		setBankData([]);
		setIsBankDataLoading(true);
		const details = await getPensionDetailsByBankCode(bankCode);
		setBankData(details);
		setIsBankDataLoading(false);
	}
	// 
	const Loader = () => (
		<div className="spinner-border" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);
	// 
	return (
		<div className='container'>
			{/*  */}
			<center>
				{/*  */}
				{/*  */}
				<h1 className='mt-5'>Annamalai University</h1>
				<p>Pension abstract for the month of July 2025</p>
				{/*  */}
				{/*  */}
				<table className='table table-bordered mt-5'>
					<thead>
						<tr>
							<th width={"130px"} className='text-center'>Bank Code</th>
							<th>Bank Name</th>
							<th className='text-end' width={"150px"}>Total Amount</th>
							<th width={"150px"}></th>
						</tr>
					</thead>
					<tbody>
						{isLoading && <tr>
							<td colSpan={4} className='text-center'><Loader /></td>
						</tr>}
						{!isLoading && jsonData.map((item, index) => (
							<tr key={index}>
								<td className='text-center'>{item.bankCode}</td>
								<td>{item.bankName}</td>
								<td className='text-end'>{formatINR(item.totalAmount)}</td>
								<td className='text-center'>
									<Button size='sm' variant='primary' onClick={() => handleShow(item.bankCode, item.bankName)}>Show</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</center>
			{/* Modal for showing detailed information */}
			<Modal show={showModal} size='lg' onHide={() => { setShowModal(false); }}>
				<Modal.Header closeButton>{modalTitle}</Modal.Header>
				<Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
					<table className='table table-bordered table-striped'>
						<thead>
							<tr>
								<th>Name</th>
								<th className='text-end'>Pension Amount</th>
							</tr>
						</thead>
						<tbody>
							{isBankDataLoading && <tr>
								<td colSpan={2} className='text-center'><Loader /></td>
							</tr>}
							{!isBankDataLoading && bankData && bankData.map((item, index) => (
								<tr key={index}>
									<td>{item['NAME']} <div className='text-muted fs-12'>{item['DESG_NAME']} - {item['DEPT_NAME']}</div></td>
									<td className='text-end'>{formatINR(item['NET_AMT'])}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Modal.Body>
			</Modal>
			{/*  */}
		</div>
	);
}
