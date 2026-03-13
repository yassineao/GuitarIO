import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Options from '../components/options';
import Retro from '../components/retro';
export default function Notes({ name }) {

  
  return (
    <div  >
       <h1 className="home__titlee">
          <div data-gliitch={"Choose your option"} className="gliitch">
          Choose your option
          </div>
        </h1>
      <section className="opt">
     
     <Options></Options>
      </section>

      <section id="unique-slider">
      
      </section>
    </div>
  );
}
