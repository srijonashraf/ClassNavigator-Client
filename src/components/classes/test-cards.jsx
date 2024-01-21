import React from 'react';
import { Button } from 'react-bootstrap';

function CustomCard() {
  return (
    <div className="card w-full max-w-3xl flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <img
          alt="Class Image"
          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          height="150"
          src="/placeholder.svg"
          style={{
            aspectRatio: '200/150',
            objectFit: 'cover',
          }}
          width="200"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="card-body flex flex-col items-start gap-2 p-4">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-bold">Class Name</h2>
            <Button className="flex items-center gap-2">
              <span>Class ID: 12345</span>
              <CopyIcon className="text-gray-500" />
            </Button>
          </div>
        </div>
        <div className="card-footer bg-gray-100 py-2 dark:bg-gray-800">
          <section className="flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">This is a section at the bottom of the card.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default CustomCard;
