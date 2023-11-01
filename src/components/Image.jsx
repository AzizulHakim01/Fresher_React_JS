import React, { useRef, useState } from 'react';
import { data } from '../../data';

const Image = () => {
  const [selected, setSelected] = useState([]);
  const [imageData, setImageData] = useState(data);

  const handleCheckboxChange = (index) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const newImageData = {
        id: imageData.length + i, // Generate a unique ID
        image: URL.createObjectURL(files[i]),
      };

      setImageData([...imageData, newImageData]);
    }

    e.target.value = ''; // Clear the input to allow selecting the same file again
  };

  const handleDeleteMarkedItems = () => {
    const updatedData = imageData.filter((image, index) => !selected.includes(index));
    setImageData(updatedData);
    setSelected([]);
  };

  //Saving Reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);


  //Handle Drag sorting
  const handleSort = () =>{
    //making duplicate item
    let tempArray=[...imageData];

    //sorting array based on selected items
    const draggedItem = tempArray.splice(dragItem.current, 1)[0]

    //switch position
    tempArray.splice(dragOverItem.current, 0, draggedItem);

    //reset the position ref
    dragItem.current=null;
    dragOverItem.current=null;

    //update the actual array
    setImageData(tempArray)
  }

  return (
    <>
    {selected.length > 0 && (<h1 className='absolute text-2xl px-6 py-4 font-bold text-zinc-700'>✅{selected.length} File Selected</h1>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-16 bg-white">
        {imageData.map((image, index) => (
          <div
            key={image.id}
            className={`relative group ${index === 0 ? 'col-span-2 row-span-2' : ''} rounded-lg overflow-hidden flex items-center justify-center shadow-xl`}
            draggable
            onDragStart={(e)=>dragItem.current = index}
            onDragEnter={(e)=>dragOverItem.current = index}
            onDragEnd={handleSort}
            onDragOver={(e)=>e.preventDefault()}
          >
            <img
              src={image.image}
              alt={`Image ${image.id}`}
              className={`${index === 0 ? 'w-full' : 'w-52'} ${selected.includes(index) ? 'filter grayscale' : ''} ${
                selected.includes(index) ? 'opacity-60' : 'opacity-100'
              }`}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 flex items-start justify-start">
              <input
                type="checkbox"
                className="m-2 rounded-md opacity-0 group-hover:opacity-100 w-10 h-10"
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center md:w-64 mx-auto sm:w-[100vw]">
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transform hover:scale-105 hover:shadow-md hover:bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8,8m2,-2l2,2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Add Images</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
          </div>
        </label>
      </div>
      </div>

      

      {selected.length > 0 && (
        <div className="fixed top-4 right-4 z-10">
          <button
            onClick={handleDeleteMarkedItems}
            className="bg-red-500 text-white px-4 py-2 rounded-full transform hover:scale-105"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default Image;