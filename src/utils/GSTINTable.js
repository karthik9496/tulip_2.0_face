import React from 'react';

const GSTINTable = ({ vendorGstinList = []}) => {
  return (
    <div className="results pb-2.5" id="gstnList">
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-200 p-2 text-left font-bold md:border md:border-gray-300 block md:table-cell">Sl No</th>
            <th className="bg-gray-200 p-2 text-left font-bold md:border md:border-gray-300 block md:table-cell">GSTN</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {vendorGstinList.map((row, index) => (
            <tr key={index} className="bg-white border border-gray-300 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-gray-300 block md:table-cell">{index + 1}</td>
              <td className="p-2 md:border md:border-gray-300 block md:table-cell">{row.gstin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GSTINTable;
