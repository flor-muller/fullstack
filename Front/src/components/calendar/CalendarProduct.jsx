import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendarProduct.css';
import { useGetDataArray } from '../../hooks/useGetDataArray';
import { endpointHost } from '../../variables/endpoint';

export const endpointAvailableDates = `${endpointHost}/products/search/nodates`;

const CalendarProduct = ({ gameId, onDateSelect }) => {
  const [inputDate, setInputDate] = useState('');
  const [outputDate, setOutputDate] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { values } = useGetDataArray(`${endpointAvailableDates}/${gameId}`);

  console.log(values);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    const selectedRangeHasUnavailableDates = checkUnavailableDatesInRange(start, end);
    if (selectedRangeHasUnavailableDates) {
      // Rango inválido, hay fechas no disponibles en el medio
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
      const timeDifference = end.getTime() - start.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const inputDateString = formatDate(start);
      const outputDateString = formatDate(end);
      setInputDate(inputDateString);
      setOutputDate(outputDateString);
      console.log('DIFERENCIA EN CALENDAR', daysDifference);
      if (onDateSelect) {
        // Invocar el callback con las fechas seleccionadas
        onDateSelect({ startDate: inputDateString, endDate: outputDateString, difference: daysDifference });
      }
    }
  };

  const checkUnavailableDatesInRange = (start, end) => {
    const unavailableDates = values;
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const formattedDate = formatDate(currentDate);
      if (unavailableDates.includes(formattedDate)) {
        return true; // Se encontró una fecha no disponible en el rango
      }
      currentDate.setDate(currentDate.getDate() + 1); // Avanzar al siguiente día
    }
    return false; // No se encontraron fechas no disponibles en el rango
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const isDateDisabled = (date) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const disabledDates = values;
    const formattedDate = formatDate(date);
    // Deshabilitar fechas pasadas
    if (date <= currentDate) {
      return true;
    }
    // Establecer clases CSS personalizadas para las fechas disponibles y no disponibles
    return disabledDates.includes(formattedDate) ? false : 'available-date';
  };  

  return (
    <div className='contenedorCalendar'>
      <DatePicker
        monthsShown={2}
        minDate={new Date()}
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        filterDate={isDateDisabled}
        dayClassName={(date) => isDateDisabled(date)}
      />
    </div>
  );
};

export default CalendarProduct;

