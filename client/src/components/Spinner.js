import React from 'react';

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-70'>
      <div className='w-10 h-20 border-2 border-dashed border-white border-t-transparent rounded-full animate-spin '>
        {/* Spinner content */}
      </div>
    </div>
  );
}

export default Spinner;
