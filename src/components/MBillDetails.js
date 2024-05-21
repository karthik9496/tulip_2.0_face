import React from 'react';

const BillDetails = () => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Bill Details</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 gap-y-6 px-4 py-5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8">
          <div className="sm:col-span-1">
            <label htmlFor="dakId" className="block text-sm font-medium text-gray-700">
              DakId No
            </label>
            <div className="mt-1">
              {/* Output value for DakId No */}
              <span className="block text-sm text-gray-900"></span>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
              Month
            </label>
            <div className="mt-1">
              {/* Output value for Month */}
              <span className="block text-sm text-gray-900"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BillDetails;
