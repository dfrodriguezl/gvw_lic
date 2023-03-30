import React from 'react';
import Modali, { useModali } from 'modali';
import HelpContent from '../components/helpcontent';
import { variables } from '../base/variables';


const Help = () => {
  const [helpModal, toggleHelpModal] = useModali();

  variables.mostrarModal = () => {
    toggleHelpModal()
  }

  return (
    <div>
      <div className="navBar__list__item__btn" onClick={variables.mostrarModal}>
        <div className="navBar__icon">
          <span className="DANE__Geovisor__icon__ask"></span>
        </div>
        <p className="navBar__iconName">Ayuda</p>
      </div>
      <Modali.Modal {...helpModal}>
        <HelpContent />
      </Modali.Modal>
    </div>
  );
};

export default Help;

