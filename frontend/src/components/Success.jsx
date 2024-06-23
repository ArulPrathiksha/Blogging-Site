import { useState } from 'react';

/* eslint-disable react/prop-types */
const Success = ({ msg }) => {
  const [show, setShow] = useState(true);

  setTimeout(() => setShow(false), 1000);

  return (
    <div>
      {show && (
        <div className="bg-green-400 text-white p-2 rounded-md mt-6 text-sm mb-4">
          <i className="fa-solid fa-circle-check"></i>
          {msg}
        </div>
      )}
    </div>
  );
};

export default Success;
