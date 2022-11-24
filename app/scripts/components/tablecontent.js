import React, { useRef, useState } from "react";
import { variables } from '../base/variables';
// import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import ExportTable from "./exportTable";


const TableContent = () => {
  const [responsive, setResponsive] = useState("vertical");
  const [data, setData] = useState([])
  const [col, setCol] = useState([])
  const [periodo, setPeriodo] = React.useState(variables.periodoSeleccionado);
  const [cobertura, setCobertura] = React.useState(variables.coberturaSeleccionado);
  const [periodicidad, setPeriodicidad] = React.useState(variables.periodoSeleccionado);
  const [tableVisible, setTableVisible] = React.useState(variables.tableVisible);
  const tableRef = useRef();

  const options = {
    movableRows: true,
    paginationDataSent: {
      page: 'page',
      size: 'per_page' // change 'size' param to 'per_page'
    },
    paginationDataReceived: {
      last_page: 'total_pages'
    },
    current_page: 1,
    pagination: 'local',
    paginationSize: 10,
    locale: "en-gb",
    langs: {
      "en-gb": {
        pagination: {
          next: 'Siguiente',
          prev: 'Anterior',
          last: 'Última',
          first: 'Primera',
          // rowsPerPage: 'Filas por página:',
          displayRows: 'of',
          // jumpToPage: 'Ir a la página:',
        },
      }
    },
    downloadDataFormatter: (data) => data,
    downloadReady: (fileContents, blob) => blob
  }

  const columns = [
    { title: "Código", field: "codigo" },
    { title: "Departamento", field: "depto" },
    { title: "Municipio", field: "mpio" },
    { title: "Valor", field: "valor" },
    {
      title: "Barra", field: "valor", hozAlign: "left", formatter: "progress", formatterParams: {
        color: ["green", "orange", "red"]
      }
    }
  ]

  variables.updateData = (dataTable, cols) => {
    setCol(cols)
    setData(dataTable)
  }

  const downloadData = () => {
    tableRef.current.table.download("csv", "data.csv");
  }

  variables.updatePeriodoTable = (periodo) => {
    setPeriodo(periodo)
  }

  variables.updateCoberturaTable = (cobertura) => {
    setCobertura(cobertura)
  }

  variables.updatePeriodicidadTable = (periodicidad) => {
    setPeriodicidad(periodicidad)
  }

  variables.updateTableVisible = (visible) => {
    setTableVisible(visible)
    if(visible){
      window.scroll({
        top: document.body.offsetHeight,
        left: 0, 
        behavior: 'smooth',
      });
    }
  }

  return (
    <React.Fragment>
      {tableVisible &&
        <React.Fragment>
          <div className="tableBox__top">
            <a href="#" id="table-closer" class="table-closer" onClick={(e) => setTableVisible(false)}></a>

            <h3 className="tableBox__tableName">Tabla de datos - {variables.tematica["CATEGORIAS"][variables.varVariable][0]["CATEGORIA"]} - Cobertura: {cobertura && cobertura.label} - Período ({periodicidad && periodicidad.label}): {periodo.label} </h3>
            <ExportTable exportar={downloadData} />
            {/* <div className="tableBox__close"></div> */}
          </div>
          <ReactTabulator
            ref={tableRef}
            columns={col}
            data={data}
            options={options}
          />
        </React.Fragment>}

    </React.Fragment>
  );
}

export default TableContent;