import React from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';
import ModalAlert from 'components/organisms/ModalAlert';

const App: React.FC = ({ children }) => (
	<>
		<Header />
		<ModalAlert />
		{children}
		<Footer />
	</>
);

export default App;
