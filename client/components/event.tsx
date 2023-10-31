import React from "react";
 
function Event({ description } : { description: string}) {
  return (
    <div className="mt-4 w-1/4 p-1 shadow-xl bg-gradient-to-r from-blue-500 via-navy-500 to-purple-500 rounded-2xl">
      <span className="block bg-white sm:p-2 rounded-xl">
        <div className="sm:pr-8">
          <p className="mt-2 text-sm text-black">{description}</p>
        </div>
      </span>
    </div>
  );
}
 
export default Event;