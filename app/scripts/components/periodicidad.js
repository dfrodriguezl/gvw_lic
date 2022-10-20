import React, { useState } from "react";
import Select from 'react-select'
import { variables } from '../base/variables';

const Periodicidad = () => {
    const [periodicidadList, setPeriodicidadList] = useState(variables.periodicidades);
    const [selectedPeriodicidad, setSelectedPeriodicidad] = useState(variables.periodicidadSeleccionado);


    const handleChange = (event) => {
        setSelectedPeriodicidad(event);
        variables.periodicidadSeleccionado = event;
        // variables.updatePeriodoHeader(event);
        // variables.updatePeriodoResult(event);
        // const currentZoom = variables.map.getView().getZoom();
        // if (currentZoom <= 7) {
        //     if (!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value]) {
        //         variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value] = {};
        //     }
        //     variables.changeTheme("DPTO", 0, "ND", "y");
        // } else if (currentZoom > 7 && currentZoom <= 11) {
        //     if (!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value]) {
        //         variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][variables.periodoSeleccionado.value] = {};
        //     }
        //     if (!variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MPIO"][variables.periodoSeleccionado.value]) {
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


    variables.updateListaPeriodicidades = (cobertura) => {
        const listaPeriodicidades = Object.keys(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"][cobertura]);
        const periodicidadList = listaPeriodicidades.map((perd) => {
            return { value: perd, label: perd };
        }, []);

        variables.periodicidades = periodicidadList;
        variables.periodicidadSeleccionado = periodicidadList[0];
        setPeriodicidadList(periodicidadList);
        setSelectedPeriodicidad(variables.periodicidadSeleccionado);
        variables.updateListaPeriodos(cobertura, variables.periodicidadSeleccionado.value);
        
    }

    return (
        <div className="tools__panel">
            <p className="tools__text">Realice la selección de la periodicidad que desea ver en el mapa</p>
            <div className="selectBox">
                <p className="selectBox__name">Periodicidad: </p>
                <Select
                    styles={{
                        navBar: provided => ({ zIndex: 9999 })
                    }}
                    name="form-field-name"
                    value={selectedPeriodicidad}
                    onChange={handleChange}
                    className="select2-container"
                    placeholder="Seleccione una cobertura"
                    options={periodicidadList}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                />
            </div>
            {/* <p className="help__content__text" itemProp="description">*El período corresponde a la sumatoria de los últimos doce meses transcurridos hasta el mes de referencia.</p> */}
        </div>
    )
}

export default Periodicidad;