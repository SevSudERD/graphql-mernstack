const RadioButton = ({ id, label, onChange, value, checked }) => {
	return (
		<div className='inline-flex items-center'>
			<label className='relative flex items-center p-3 rounded-full cursor-pointer' htmlFor={id}>
				<input
					name='type'
					type='radio'
					className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-white text-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-white checked:before:bg-white hover:before:white"
					id={id}
					value={value}
					onChange={onChange}
					checked={checked}
				/>
				<span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-3.5 w-3.5'
						viewBox='0 0 16 16'
						fill='currentColor'
					>
						<circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
					</svg>
				</span>
			</label>
			<label className='mt-px font-light text-white cursor-pointer select-none' htmlFor={id}>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;