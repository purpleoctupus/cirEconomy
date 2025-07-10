import React from "react";

interface FieldProps {
  label: string;
  error?: string;
  input: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, input }) => {
  return (
    <div className="flex-1">
      <label className="block text-gray-600 text-sm mb-1">{label}</label>
      {input}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Field;
