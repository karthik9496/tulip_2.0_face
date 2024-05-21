//Experimental
//import '../index.css'
import React, { useState } from 'react';

export default function Layout() {
	const [lightTheme, setLightTheme] = useState(true);

	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'}>
		<div className="mx-4 self-center" >
			<input
				type="checkbox"
				checked={lightTheme}
				onChange={() => setLightTheme(!lightTheme)}
			/>
			{/* The rest of the app goes in here. */}
			<input type="text" name="usrName" 
								className=" w-1/2 color-primary-300 form-control border rounded py-0 focus:ring text-gray-700" />
							
			<h1 className="text-onNeutralBgSoft ...">Primary Colour </h1>
			<button className="py-1 px-2 border-2 bg-green-500 rounded  text-onNeutralBgSoft ...">Button</button>
			</div>
		</div>
	);
}