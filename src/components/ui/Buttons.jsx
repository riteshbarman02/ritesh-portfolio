import React from 'react';

const Buttons = ({ label, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 font-cursive text-xl font-bold px-6 py-2 bg-background doodle-border-sm doodle-shadow doodle-clickable text-text-heading hover:text-primary hover:border-primary active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border)] cursor-pointer select-none"
      {...props}
    >
      {label}
    </button>
  );
};

export default Buttons;

