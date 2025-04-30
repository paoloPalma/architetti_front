import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1e4e6f] text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-4 flex items-center">
              <Phone size={16} className="mr-2" /> Contatti
            </h4>
            <p className="text-sm mb-2">Tel: +39 123 456 7890</p>
            <p className="text-sm mb-2">Fax: +39 123 456 7891</p>
            <p className="text-sm">info@architettichpe.it</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 flex items-center">
              <MapPin size={16} className="mr-2" /> Dove siamo
            </h4>
            <p className="text-sm mb-2">Via Roma, 123</p>
            <p className="text-sm mb-2">65100 Pescara (PE)</p>
            <p className="text-sm">Italia</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 flex items-center">
              <Mail size={16} className="mr-2" /> Contattaci
            </h4>
            <p className="text-sm mb-2">
              Compila il form nella sezione contatti
            </p>
            <div className="flex space-x-2 mt-4">
              <Link
                href="#"
                className="bg-white text-[#1e4e6f] w-8 h-8 flex items-center justify-center rounded-full"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="#"
                className="bg-white text-[#1e4e6f] w-8 h-8 flex items-center justify-center rounded-full"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8 pt-4 border-t border-blue-700 text-xs text-center">
          <p>© Fondazione Centro Studi e Risposta Professionale Architetti</p>
          <p>Copyright 2025 - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
