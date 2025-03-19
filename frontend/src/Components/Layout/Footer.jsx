import React from "react";

function Footer() {
  return (
    <>
      <footer className="py-8 bg-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">Town Trouble</h4>
          <p>Making communities better, one report at a time.</p>
          <div className="mt-4">
            <p>
              © Rithik{new Date().getFullYear()} Town Trouble. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
