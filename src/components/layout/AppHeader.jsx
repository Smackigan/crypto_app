import { Layout, Select, Space, Button, Modal } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';

const headerStyle = {
	textAlign: 'center',
	// backgroundColor: '#fff',
	height: 60,
	width: '100%',
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignitems: 'center',
};

function AppHeader() {
	const [select, setSelect] = useState(false);
	const [coin, setCoin] = useState(null);
	const [modal, setModal] = useState(false);
	const { crypto } = useCrypto();

	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === '/') {
				setSelect((prev) => !prev);
			}
		};
		document.addEventListener('keypress', keypress);
		return () => document.removeEventListener('keypress', keypress);
	}, []);

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value));
		console.log(value);
		setModal(true);
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{
					width: '100%',
				}}
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect()}
				value="press / to open"
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img
							src={option.data.icon}
							style={{ width: 20 }}
							alt={option.data.label}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>

			<Button type="primary">Add asset</Button>

			<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
				<CoinInfoModal coin={coin} />
			</Modal>
		</Layout.Header>
	);
}

export default AppHeader;
