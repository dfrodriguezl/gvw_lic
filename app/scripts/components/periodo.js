import React, { useState } from "react";
import Select from 'react-select'
import { variables } from '../base/variables';

const Periodo = () => {
    const [periodosList, setPeriodosList] = useState(variables.periodos);
    const [selectedPeriodo, setSelectedPeriodo] = useState(variables.periodoSeleccionado);
    const [periodicidad, setPeriodicidad] = useState(variables.periodicidadSeleccionado);


    const handleChange = (event) => {
        setSelectedPeriodo(event);
        variables.periodoSeleccionado = event;
        variables.updatePeriodoHeader(event);
        variables.updatePeriodoResult(event);
        const currentZoom = variables.map.getView().getZoom();
        if (currentZoom <= 7) {
            // if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.coberturaSeleccionado.value][variables.periodicidadSeleccionado.value][variables.periodoSeleccionado.value]){
            //     variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.coberturaSeleccionado.value][variables.periodicidadSeleccionado.value][variables.periodoSeleccionado.value] = {};
            // }
            variables.changeTheme("DPTO", 0, "ND", "y");
        } else if (currentZoom > 7 && currentZoom <= 11) {
            if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value]){
                variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value] = {};
            }
            if(!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MPIO"][variables.periodoSeleccionado.value]){
                variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MPIO"][variables.periodoSeleccionado.value] = {};
            }
            variables.changeTheme("DPTO", 0, "ND", "y");
            variables.changeTheme("MPIO", null, null, "y");
            if (variables.deptoSelected == undefined && variables.deptoVariable != undefined) {
                variables.filterGeo("DPTO", variables.deptoVariable)
            }
            variables.changeStyleDepto();
        } else {
            if (variables.municipioSeleccionado != null) {
                variables.changeTheme("DPTO", 0, "ND", "n");
                variables.changeTheme("MPIO", variables.municipioSeleccionado, null, "y");
            }

            variables.changeTheme("SECC", null, "NSC", "n");
            variables.changeStyleDepto();
            variables.changeStyleMpio();
        }
    }

    variables.updateListaPeriodos = (cobertura, periodicidad) => {
        const listaPeriodos = Object.keys(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][cobertura][periodicidad]).sort().reverse();
        const periodios = listaPeriodos.map((perd) => {
            return { value: perd, label: perd };
        }, []);

        variables.periodos = periodios;
        variables.periodoSeleccionado = periodios[0];
        setPeriodosList(periodios);
        setSelectedPeriodo(variables.periodoSeleccionado);
    }

    variables.updatePeriodicidad = () => {
        setPeriodicidad(variables.periodicidadSeleccionado);
    }


    return (
        <div className="tools__panel">
            <p className="tools__text">Realice la selección de período que desea ver en el mapa</p>
            <div className="selectBox">
                <p className="selectBox__name">Periodo:*</p>
                <Select
                    styles={{
                        navBar: provided => ({ zIndex: 9999 })
                    }}
                    name="form-field-name"
                    value={selectedPeriodo}
                    onChange={handleChange}
                    className="select2-container"
                    placeholder="Seleccione un período"
                    options={periodosList}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                /> 
            </div>
            <p className="help__content__text" itemProp="description">
                {periodicidad.value === "Doce meses" ? 
                "*El período corresponde a la sumatoria de los últimos doce meses transcurridos hasta el mes de referencia." : 
                "*El período corresponde a la sumatoria del último trimestre hasta el mes de referencia."}
                
                </p>
        </div>
    )
}

export default Periodo;