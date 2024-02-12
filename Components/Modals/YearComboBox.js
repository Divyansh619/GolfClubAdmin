import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function YearComboBox({ label, selectedYear, setSelectedYear, onInputChange }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control Combobox open state

  // Years from 1980 to 2050
  const years = Array.from({length: 71}, (_, i) => 1980 + i);

  const filteredYears = query === '' ? years : years.filter((year) => year.toString().includes(query));

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Update the query when selectedYear changes
  useEffect(() => {
    if (selectedYear) {
      setQuery(selectedYear.toString());
    }
  }, [selectedYear]);

  return (
    <Combobox as="div" value={selectedYear} onChange={(value) => {
      setSelectedYear(value);
      if (onInputChange) {
        onInputChange(value);
      }
      setIsOpen(false); // Close Combobox when an option is selected
    }} open={isOpen} onOpenChange={setIsOpen}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 focus:outline-none sm:text-sm sm:leading-6"
          onChange={(event) => {
              setQuery(event.target.value);
              if (onInputChange) {
                onInputChange(event.target.value);
              }
          }}
          onClick={() => setIsOpen(true)} // Open Combobox when input is clicked
          value={query}
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md focus:outline-none">
          <ChevronDownIcon className="h-4 w-5 text-black" aria-hidden="true" />
        </Combobox.Button>

        {filteredYears.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-blue ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredYears.map((year) => (  
              <Combobox.Option
                key={year}  
                value={year}  
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-blue-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{year}</span> 
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
