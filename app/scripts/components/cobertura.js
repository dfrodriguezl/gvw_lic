import React, { useState } from "react";
import Select from 'react-select'
import { variables } from '../base/variables';

const Cobertura = () => {
    const [coberturasList, setCoberturasList] = useState(variables.coberturas);
    const [selectedCobertura, setSelectedCobertura] = useState(variables.coberturaSeleccionado);


    const handleChange = (event) => {
        setSelectedCobertura(event);
        variables.coberturaSeleccionado = event;
        variables.updateListaPeriodicidades(event.value);
        let currZoom = variables.map.getView().getZoom();
        if (currZoom < 7) {
            variables.changeTheme("DPTO", null, "NM", "N");
        } else {
            variables.changeTheme("MPIO", null, "NM", "N");
        }
        if(variables.updateCoberturaHeader){
            variables.updateCoberturaHeader(event);
        }
        if(variables.updateCoberturaResult){
            variables.updateCoberturaResult(event);
        }
        // variables.updatePeriodoHeader(event);
        // variables.updatePeriodoResult(event);
        // const currentZoom = variables.map.getView().getZoom();
        // if (currentZoom <= 7) {
        //     if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value]){
        //         variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value] = {};
        //     }
        //     variables.changeTheme("DPTO", 0, "ND", "y");
        // } else if (currentZoom > 7 && currentZoom <= 11) {
        //     if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value]){
        //         variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value] = {};
        //     }
        //     if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MPIO"][variables.periodoSeleccionado.value]){
        //         variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MPIO"][variables.periodoSeleccionado.value] = {};
        //     }
        //     variables.changeTheme("DPTO", 0, "ND", "y");
        //     variables.changeTheme("MPIO", null, null, "y");
        //     if (variables.deptoSelected == undefined && variables.deptoVariable != undefined) {
        //         variables.filterGeo("DPTO", variables.deptoVariable)
        //     }
        //     variables.changeStyleDepto();
        // } else {
        //     if (variables.municipioSeleccionado != null) {
        //         variables.changeTheme("DPTO", 0, "ND", "n");
        //         variables.changeTheme("MPIO", variables.municipioSeleccionado, null, "y");
        //     }

        //     variables.changeTheme("SECC", null, "NSC", "n");
        //     variables.changeStyleDepto();
        //     variables.changeStyleMpio();
        // }
    }




    return (
        <div className="tools__panel">
            <p className="tools__text">Realice la selección de la cobertura que desea ver en el mapa</p>
            <div className="selectBox">
                <p className="selectBox__name">Cobertura: </p>
                <Select
                    styles={{
                        navBar: provided => ({ zIndex: 9999 })
                    }}
                    name="form-field-name"
                    value={selectedCobertura}
                    onChange={handleChange}
                    className="select2-container"
                    placeholder="Seleccione una cobertura"
                    options={coberturasList}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                />
            </div>
            {/* <p className="help__content__text" itemProp="description">*El período corresponde a la sumatoria de los últimos doce meses transcurridos hasta el mes de referencia.</p> */}
        </div>
    )
}

export default Cobertura;