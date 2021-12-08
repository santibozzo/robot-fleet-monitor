import './Button.css';

const Button = props => {
	const {className, style, text, onClick} = props;

	const getStyles = () => {
		let styles = 'button-base';
		if (className) {
			styles = `${styles} ${className}`;
		}
		if (style) {
			styles = `${styles} button-${style}`;
		}
		return styles;
	};

	return (
		<button onClick={onClick} className={getStyles()}>
			{text}
		</button>
	);
};

export default Button;