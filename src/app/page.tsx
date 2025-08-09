'use client';
// 
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

// 
export default function Home() {
	// 
	const [jsonData, setJsonData] = useState<any[]>([]);
	// 
	useEffect(() => {
		// fetch('/data.xls')
		// 	.then(res => res.arrayBuffer())
		// 	.then(data => {
		// 		const workbook = XLSX.read(data, { type: 'array' });
		// 		const sheetName = workbook.SheetNames[0];
		// 		const sheet = workbook.Sheets[sheetName];
		// 		const json = XLSX.utils.sheet_to_json(sheet);
		// 		setJsonData(json);
		// 	})
		// 	.catch(err => console.error('Error reading file:', err));
	}, []);
	// 
	return (
		<div style={{ padding: '20px' }}>
			<h1>Excel from Public Folder {jsonData.length} Rows</h1>
			<Button variant="contained" color="primary">
				Hello MUI
			</Button>
			<pre>{JSON.stringify(jsonData, null, 2)}</pre>
		</div>
	);
}
