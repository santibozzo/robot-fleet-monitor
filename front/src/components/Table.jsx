import './Table.css';

const Table = props => {
	const {className, style, columns, rows} = props;

	const getStyles = () => {
		let styles = 'table-base';
		if (className) {
			styles = `${styles} ${className}`;
		}
		if (style) {
			styles = `${styles} table-${style}`;
		}
		return styles;
	};

	return (
		<table className={getStyles()}>
			<tr>
				{columns.map(column => (
					<th className={'table-th'}>{column}</th>
				))}
			</tr>
			{rows.map(r => (
				<tr>
					{r.cells.map(cell => (
						<td className={'table-td'}>{cell}</td>
					))}
				</tr>
			))}
		</table>
	);
};

export default Table;