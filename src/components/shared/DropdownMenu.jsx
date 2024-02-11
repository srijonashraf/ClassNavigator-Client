import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'; // Import the icon component

const DropdownMenu = ({ menuItems, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to handle click outside the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Effect to add event listener when component mounts
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handler for toggling the dropdown
    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    // Handler for selecting an item from the dropdown
    const handleMenuItemClick = (item) => {
        onSelect(item);
        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button className='dropdown-toggler' onClick={toggleDropdown}>
                <BsThreeDotsVertical />
            </button>
            {isOpen && (
                <ul className='dropdown-menu'>
                    {menuItems.map((item, index) => (
                        <li key={index} onClick={() => handleMenuItemClick(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
