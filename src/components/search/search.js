import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        //
        /* Obtener los datos de la API y devolverlos. Damos uso de los parametros opcionales de la API minPopulation y namePrefix*/
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch(err => console.error(err));
    }

    /** Cuando el usuario escribe en la barra de búsqueda, el valor de la barra de búsqueda se establece
     * en la entrada del usuario y se llama a la función onSearchChange con la entrada del usuario como
     * argumento.
     * @param searchData - Los datos de búsqueda que se ingresaron en el cuadro de búsqueda */

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }


    return (
        <AsyncPaginate
            placeholder="Busca una ciudad"
            debounceTime={600}
            value={search}
            onChange={handleOnChange}
            //Method to load options to all the cities in the API
            loadOptions={loadOptions}
        />
    );
}

export default Search;